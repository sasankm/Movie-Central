package com.moviecentral.mc.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.moviecentral.mc.entity.User;
import com.moviecentral.mc.models.LoginRequest;
import com.moviecentral.mc.models.LoginResponse;
import com.moviecentral.mc.repository.UserRepository;

@RestController
public class LoginController {

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserRepository userRepository;
	
	@PostMapping(value="/login")
	public LoginResponse login(@RequestBody LoginRequest req){
		String username = req.getUsername();
		String password = req.getPassword();
		
		User user = userRepository.findByUsername(username);
		if(user == null){
			return new LoginResponse("FAILURE", "", "invalid username");
		}
		
		if(passwordEncoder.matches(password, user.getPassword())){
			//start session with usertype and username, id etc..
			return new LoginResponse("SUCCESS", user.getType(), "");
		} else {
			return new LoginResponse("FAILURE", user.getType(), "invalid password");
		}
	}
}
