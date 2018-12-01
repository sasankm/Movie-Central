package com.moviecentral.mc.controllers;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.moviecentral.mc.entity.User;
import com.moviecentral.mc.models.LoginResponse;
import com.moviecentral.mc.models.SignupRequest;
import com.moviecentral.mc.repository.UserRepository;

@RestController
public class SignupController {
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserRepository userRepository;
	
	@PostMapping(value="/signup")
	public LoginResponse signup(@RequestBody SignupRequest req){
		String genpasd = passwordEncoder.encode(req.getPassword());
		
		User user = new User();
		user.setUsername(req.getUsername());
		user.setPassword(genpasd);
		user.setEmail(req.getEmail());
		user.setType("ADMIN");
		userRepository.save(user);
		return new LoginResponse(req.getEmail(), genpasd, req.getUsername());
	}
	
}
