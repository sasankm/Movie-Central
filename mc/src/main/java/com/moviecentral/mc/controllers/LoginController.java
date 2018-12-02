package com.moviecentral.mc.controllers;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.moviecentral.mc.entity.User;
import com.moviecentral.mc.models.LoginRequest;
import com.moviecentral.mc.models.LoginResponse;
import com.moviecentral.mc.repository.UserRepository;
import com.moviecentral.mc.utils.Session;

@RestController
public class LoginController {

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserRepository userRepository;
	
	@PostMapping("/login")
	public LoginResponse login(HttpSession session, @RequestBody LoginRequest req){
		String username = req.getUsername();
		String password = req.getPassword();
		
		User user = userRepository.findByUsername(username);
		if(user == null){
			return new LoginResponse("FAILURE", "", "invalid username");
		}
		
		if(passwordEncoder.matches(password, user.getPassword())){
			//set session
			session.setAttribute("session", new Session(user.getUserid(), user.getType(), user.getUsername(), user.getEmail()));
			return new LoginResponse("SUCCESS", user.getType(), "");
		} else {
			return new LoginResponse("FAILURE", user.getType(), "invalid password");
		}
	}
	
	@GetMapping(value = "/userlogout")
	public LoginResponse logout(HttpSession session){
		Session s = (Session) session.getAttribute("session");
		if(s == null || s.getUserid() == -1){
			return new LoginResponse("FAILURE", "", "invalid session");
		} else {
			session.setAttribute("session", new Session(-1, "", "", ""));
			return new LoginResponse("SUCCESS", "", "logout successful");
		}
	}
	
	@GetMapping("/checksession")
	public LoginResponse checksession(HttpSession session){
		Session s = (Session) session.getAttribute("session");
		String res = "";
		if(s == null || s.getUserid() == -1){
			res = "invalid session";
		} else {
			res = "valid session";
		}
		return new LoginResponse("SUCCESS", "", res);
	}
}
