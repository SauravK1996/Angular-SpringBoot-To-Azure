package com.example.demo.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.example.demo.service.SasTokenGeneratorService;

@RestController
@RequestMapping(value = "/api")
public class GenerateSasTokenController {

	@Autowired
	private SasTokenGeneratorService sasTokenGeneratorService;

	private static Logger LOGGER = LoggerFactory.getLogger(GenerateSasTokenController.class);

	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping(value = "/getSasToken", produces = "text/plain")
	public ResponseEntity<String> getSasToken(HttpServletRequest request, HttpServletResponse response) {
		try {
			
			LOGGER.info(request.getParameter("containername"));

			return new ResponseEntity<>(
					sasTokenGeneratorService.generateSasToken(request.getParameter("containername")), HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("Error in generating sas token.", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
