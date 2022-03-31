import { Component } from '@angular/core';
import { BlobServiceClient, AnonymousCredential, newPipeline } from '@azure/storage-blob';
import { environment } from 'src/environments/environment';
import { GenerateSasUrlService } from './generate-sas-url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public getSasUrlForContainer: GenerateSasUrlService) { }

  title = 'angular-to-azure';
  currentFile: File = null;
  sasUrl: string;
  res:any;

  onFileChange(event) {
    this.currentFile = event.target.files[0];
    this.upload();
  }


  async upload() {
    const containername = environment.containername;
    this.sasUrl = '';
    this.res = '';
    this.getSasUrlForContainer.getSasUrl(containername).subscribe(async (data: any) => {
      // 
      console.log("Data : " + data);
      this.sasUrl = data;
      console.log(this.sasUrl);

      const blobServiceClient = new BlobServiceClient(this.sasUrl);
      console.log(blobServiceClient);
      const containerClient = blobServiceClient.getContainerClient(containername)
      console.log(containerClient);

      if (!containerClient.exists()) {
        console.log("the container does not exit")
        await containerClient.create()

      }

      const client = containerClient.getBlockBlobClient(this.currentFile.name)
      console.log(client.url);

      const response = await client.uploadData(this.currentFile, {
        blockSize: 4 * 1024 * 1024, // 4MB block size
        concurrency: 20, // 20 concurrency
        onProgress: (ev) => console.log(ev),
        blobHTTPHeaders: { blobContentType: this.currentFile.type }
      })

      this.res = response._response.status;
      console.log(response._response.status)

    }, error => {
      console.log(error);
    });
  }

}
