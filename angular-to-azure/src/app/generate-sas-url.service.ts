import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenerateSasUrlService {
  constructor(private http: HttpClient) { }
  endpoint = "http://localhost:9999/api/getSasToken";

  getSasUrl(containername: string): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'text/plain'
    });
    // let options = {
    //   headers: reqHeader,
    //   params: new HttpParams().set("containername", containername),
    //   responseType: 'text'
    // };
    return this.http.get(this.endpoint, { responseType: 'text', params: new HttpParams().set("containername", containername) });
    // return this.http.get(this.endpoint + '?containername=' + containerName).pipe(
    //   catchError(this.handleError)
    // );
  }

  // private handleError(error: HttpErrorResponse): any {
  //   if (error.error instanceof ErrorEvent) {
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // }
}
