package com.moviecentral.mc.controllers;

import java.sql.Timestamp;
import java.util.ArrayList;

import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.GenericPropertyMatcher;
import org.springframework.data.domain.ExampleMatcher.MatcherConfigurer;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.JpaSort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.moviecentral.mc.entity.Movie;
import com.moviecentral.mc.entity.MovieAttributes;
import com.moviecentral.mc.entity.Payment;
import com.moviecentral.mc.entity.PlayHistory;
import com.moviecentral.mc.entity.User;
import com.moviecentral.mc.entity.Attributes;
import com.moviecentral.mc.models.SearchQuery;
import com.moviecentral.mc.models.SearchResponse;
import com.moviecentral.mc.models.LoginResponse;
import com.moviecentral.mc.models.SearchMovie;
import com.moviecentral.mc.repository.AttributesRepository;
import com.moviecentral.mc.repository.MovieAttributesRepository;
import com.moviecentral.mc.repository.MovieRepository;
import com.moviecentral.mc.repository.PaymentRepository;
import com.moviecentral.mc.repository.PlayHistoryRepository;
import com.moviecentral.mc.repository.UserRepository;
import com.moviecentral.mc.utils.MovieSpecifications;
import com.moviecentral.mc.utils.Session;
import com.moviecentral.mc.utils.StopWords;

@RestController
public class MovieController {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private AttributesRepository attributesRepository;

	@Autowired
	private PaymentRepository paymentRepository;
	
	@Autowired
	private MovieAttributesRepository movieAttributesRepository;
	
	@Autowired
	private PlayHistoryRepository playHistoryRepository;

	@Autowired
	private MovieRepository movieRepository;
	
	@Autowired
	private StopWords stopWord;
	
	
	private Collection<? extends String> filterStopWords(String str) {
		String[] split = str.split(" ");
		Collection<String> ret = new ArrayList<String>();
		for(String s : split){
			s = s.replaceAll("[^a-zA-Z0-9]", "");
			if(stopWord.getWords().contains(s) == false){
				ret.add(s);
			}
		}
		
		return ret;
	}
	
	private Set<String> generateKeyWords(String title, String synopsis, String actors, String director) {
		Set<String> keywords = new HashSet<String>();
		keywords.addAll(this.filterStopWords(title));
		keywords.addAll(this.filterStopWords(synopsis));
		keywords.addAll(this.filterStopWords(actors));
		keywords.addAll(this.filterStopWords(director));
		return keywords;
	}

	@PostMapping("/add-movie")
	public LoginResponse addMovie(HttpSession session, @RequestBody Movie movie){
		Session s = (Session) session.getAttribute("session");
		
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
		
		//get the set of keywords
		Set<String> keywords = this.generateKeyWords(movie.getTitle(), movie.getSynopsis(), movie.getActors(), movie.getDirector());
		
		//find and update in attributes table and get list of attributes
		List<Attributes> attributes = new ArrayList<Attributes>();
		for(String str : keywords){
			Attributes atr = attributesRepository.findByValue(str);
			if(atr == null){
				atr = new Attributes();
				atr.setValue(str);
			}
			attributes.add(atr);
		}
		attributesRepository.saveAll(attributes);
		
		//add movie
		movie = movieRepository.save(movie);
		
		//for each attribute insert in movie_attributes table a row.
		List<MovieAttributes> movieAttributes = new ArrayList<MovieAttributes>();
		for(Attributes atr : attributes){
			MovieAttributes ma = new MovieAttributes();
			ma.setAttributesid(atr.getAttributesid());
			ma.setMovieid(movie.getMovieid());
			movieAttributes.add(ma);
		}
		movieAttributesRepository.saveAll(movieAttributes);
		
		return new LoginResponse("SUCCESS", s.getType(), "movie created");
	}
	
	@GetMapping("/search")
	public SearchResponse search(HttpSession session, SearchQuery query){
		
		List<Movie> movies = movieRepository.findAll(Specification.where(MovieSpecifications.withKeys(query.getKeys()))
				.and(MovieSpecifications.withGenre(query.getGenre()))
				.and(MovieSpecifications.withYear(query.getYear()))
				.and(MovieSpecifications.withActors(query.getActors()))
				.and(MovieSpecifications.withDirectors(query.getDirectors()))
				.and(MovieSpecifications.withRating(query.getRating()))
				.and(MovieSpecifications.withStars(query.getStars())));
		
		
		SearchResponse searchResponse = new SearchResponse();
		searchResponse.setStatus("SUCCESS");
		List<SearchMovie> list = new ArrayList<SearchMovie>();
		
		for(Movie m : movies){
			System.out.println(m.getTitle());
			SearchMovie s = new SearchMovie();
			s.setMovieid(m.getMovieid());
			s.setMovie(m.getMovie());
			s.setTitle(m.getTitle());
			s.setYear(m.getYear());
			s.setStudio(m.getStudio());
			s.setSynopsis(m.getSynopsis());
			s.setImage(m.getImage());
			s.setMovie(m.getMovie());
			s.setActors(m.getActors());
			s.setDirector(m.getDirector());
			s.setCountry(m.getCountry());
			s.setRating(m.getRating());
			s.setAvailability(m.getAvailability());
			s.setPrice(m.getPrice());
			list.add(s);
		}
		searchResponse.setMovies(list);
		
		return searchResponse;
	}

	@GetMapping("/movie")
	public SearchMovie movie(HttpSession session, @RequestParam("movieid")Integer movieid){
		SearchMovie s = new SearchMovie();
		if(movieid != null){
			Optional<Movie> mm = movieRepository.findById(movieid);
			if(mm.isPresent()){
				Movie m = mm.get();
				
				s.setMovieid(m.getMovieid());
				s.setMovie(m.getMovie());
				s.setTitle(m.getTitle());
				s.setYear(m.getYear());
				s.setStudio(m.getStudio());
				s.setSynopsis(m.getSynopsis());
				s.setImage(m.getImage());
				s.setMovie(m.getMovie());
				s.setActors(m.getActors());
				s.setDirector(m.getDirector());
				s.setCountry(m.getCountry());
				s.setRating(m.getRating());
				s.setAvailability(m.getAvailability());
				s.setPrice(m.getPrice());
			}
		}
		
		return s;
	}
	
	@GetMapping("/play")
	public LoginResponse playMovie(HttpSession session, @RequestParam("movieid")Integer movieid){
		Session s = (Session) session.getAttribute("session");
		
		if(s == null || s.getUserid() == -1){
			return new LoginResponse("FAILURE", "", "invalid session");
		} else {
			Movie m = movieRepository.findByMovieid(movieid);
			User u = userRepository.findByEmail(s.getEmail());
			Timestamp ts = new Timestamp(System.currentTimeMillis() - (long)24*60*60*1000);
			List<PlayHistory> p = playHistoryRepository.findIfPaid(ts, u.getUserid(), m.getMovieid());
			
			if(s.getType().equals("ADMIN")){
				if(p.size() == 0){
					PlayHistory pp = new PlayHistory();
					pp.setDate(new Timestamp(System.currentTimeMillis()));
					pp.setMovieid(m.getMovieid());
					pp.setUserid(u.getUserid());
					pp.setType(m.getAvailability());
					playHistoryRepository.save(pp);
				}
				return new LoginResponse("SUCCESS", s.getType(), "");
			} else {
				
				String avail = m.getAvailability();
				if(avail.equals("Free")){
					
					if(u.getActivated() == 1){
						if(p.size() == 0){
							PlayHistory pp = new PlayHistory();
							pp.setDate(new Timestamp(System.currentTimeMillis()));
							pp.setMovieid(m.getMovieid());
							pp.setUserid(u.getUserid());
							pp.setType(m.getAvailability());
							playHistoryRepository.save(pp);
						}
						return new LoginResponse("SUCCESS", u.getType(), "");
					}
					return new LoginResponse("FAILURE", u.getType(), "Activate your account to watch this movie");
					
				} else if(avail.equals("SubscriptionOnly")){
					
					if(u.getSubscription() == 1){
						if(p.size() == 0){
							PlayHistory pp = new PlayHistory();
							pp.setDate(new Timestamp(System.currentTimeMillis()));
							pp.setMovieid(m.getMovieid());
							pp.setUserid(u.getUserid());
							pp.setType(m.getAvailability());
							playHistoryRepository.save(pp);
						}
						return new LoginResponse("SUCCESS", u.getType(), "");
					}
					return new LoginResponse("FAILURE", u.getType(), "Please subscribe to watch");
					
				} else if(avail.equals("PayPerViewOnly")){
					
					if(u.getActivated() == 0){
						return new LoginResponse("FAILURE", u.getType(), "Activate your account to watch this movie");
					}
					Payment payment = paymentRepository.findIfPaid(ts, u.getUserid(), m.getMovieid());
					
					if(payment != null){
						if(p.size() == 0){
							PlayHistory pp = new PlayHistory();
							pp.setDate(new Timestamp(System.currentTimeMillis()));
							pp.setMovieid(m.getMovieid());
							pp.setUserid(u.getUserid());
							pp.setType(m.getAvailability());
							playHistoryRepository.save(pp);
						}
						return new LoginResponse("SUCCESS", u.getType(), "");
					}
					
					return new LoginResponse("FAILURE", u.getType(), "You need to pay to watch this movie");
					
				} else {
					
					if(u.getSubscription() == 1){
						if(p.size() == 0){
							PlayHistory pp = new PlayHistory();
							pp.setDate(new Timestamp(System.currentTimeMillis()));
							pp.setMovieid(m.getMovieid());
							pp.setUserid(u.getUserid());
							pp.setType(m.getAvailability());
							playHistoryRepository.save(pp);
						}
						return new LoginResponse("SUCCESS", u.getType(), "");
					}
					if(u.getActivated() == 1){
						Payment payment = paymentRepository.findIfPaid(ts, u.getUserid(), m.getMovieid());
						if(payment != null){
							if(p.size() == 0){
								PlayHistory pp = new PlayHistory();
								pp.setDate(new Timestamp(System.currentTimeMillis()));
								pp.setMovieid(m.getMovieid());
								pp.setUserid(u.getUserid());
								pp.setType(m.getAvailability());
								playHistoryRepository.save(pp);
							}
							return new LoginResponse("SUCCESS", u.getType(), "");
						}
						return new LoginResponse("FAILURE", u.getType(), "You need to pay to watch this movie");
					}
					return new LoginResponse("FAILURE", u.getType(), "Activate your account to watch this movie");
				}
			}
		}
	}
	
}
