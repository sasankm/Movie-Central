package com.moviecentral.mc.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.moviecentral.mc.models.LoginRequest;
import com.moviecentral.mc.models.LoginResponse;

@RestController
public class LoginController {
	
	@PostMapping(value="/login")
	public LoginResponse login(@RequestBody LoginRequest req){
		return new LoginResponse(req.getUsername(), req.getPassword(), new String("asd"));
	}
}
