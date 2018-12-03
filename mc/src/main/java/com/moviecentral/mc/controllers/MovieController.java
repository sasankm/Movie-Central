package com.moviecentral.mc.controllers;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.moviecentral.mc.entity.Movie;
import com.moviecentral.mc.models.LoginRequest;
import com.moviecentral.mc.models.LoginResponse;
import com.moviecentral.mc.repository.AttributesRepository;
import com.moviecentral.mc.repository.MovieAttributesRepository;
import com.moviecentral.mc.repository.MovieRepository;
import com.moviecentral.mc.repository.UserRepository;
import com.moviecentral.mc.utils.Session;

@RestController
public class MovieController {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private AttributesRepository attributesRepository;

	@Autowired
	private MovieAttributesRepository movieAttributesRepository;

	@Autowired
	private MovieRepository movieRepository;
	
	@PostMapping("/add-movie")
	public LoginResponse addMovie(HttpSession session, @RequestBody Movie movie){
		Session s = (Session) session.getAttribute("session");
		
		//year, rating, availability, price
		if(!movie.getYear().getClass().getSimpleName().equals("Integer")){
			return new LoginResponse("SUCCESS", s.getType(), "movie year has to be integer");
		}
		if(!movie.getRating().getClass().getSimpleName().equals("String") || (movie.getRating().equals("G") == false && 
				movie.getRating().equals("PG") == false &&movie.getRating().equals("PG-13") == false && movie.getRating().equals("R") == false && 
				movie.getRating().equals("NC-17") == false)){
			return new LoginResponse("SUCCESS", s.getType(), "invalid rating");
		}
		if(!movie.getPrice().getClass().getSimpleName().equals("Integer")){
			return new LoginResponse("SUCCESS", s.getType(), "movie price has to be integer");
		}
		movieRepository.save(movie);
		return new LoginResponse("SUCCESS", s.getType(), "movie created");
	}
}
