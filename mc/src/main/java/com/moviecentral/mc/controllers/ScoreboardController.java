package com.moviecentral.mc.controllers;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.util.Pair;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.moviecentral.mc.entity.Movie;
import com.moviecentral.mc.entity.PlayHistory;
import com.moviecentral.mc.entity.User;
import com.moviecentral.mc.models.HistoryResponse;
import com.moviecentral.mc.models.SearchMovie;
import com.moviecentral.mc.models.StatsUsers;
import com.moviecentral.mc.models.UserInfo;
import com.moviecentral.mc.repository.MovieRepository;
import com.moviecentral.mc.repository.PlayHistoryRepository;
import com.moviecentral.mc.repository.UserRepository;

@RestController
public class ScoreboardController {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PlayHistoryRepository playHistoryRepository;

	@Autowired
	private MovieRepository movieRepository;
	
	@GetMapping(value="/stats")
	public HistoryResponse stats(HttpSession session, @RequestParam("cls") Optional<String> cls, @RequestParam("period") Optional<Integer> period){
		HistoryResponse historyResponse = new HistoryResponse();
		if(cls.isPresent()){
			String clas = cls.get();
			
			long p = 1;
			if(period.isPresent() && (period.get() == 1 || period.get() == 2)){
				if(period.get() == 1){
					p = 7;
				} else {
					p = 30;
				}
			}
			System.out.println(p);
			
			if(clas.equals("users")){
				Timestamp s = new Timestamp(System.currentTimeMillis() - p*24*60*60*1000);
				List<StatsUsers> list = playHistoryRepository.findStatsUsers(s, PageRequest.of(0, 10));
				List<Integer> userids = new ArrayList<Integer>();
				for(StatsUsers ph : list){
					userids.add(ph.getPhis().getUserid());
				}
				List<User> userslist = userRepository.findByUseridIn(userids);
				List<UserInfo> userInfo = new ArrayList<UserInfo>();
				
				for(User u : userslist){
					UserInfo ui = new UserInfo();
					
					ui.setUserid(u.getUserid());
					ui.setUsername(u.getUsername());
					ui.setEmail(u.getEmail());
					ui.setType(u.getType());
					ui.setSubscription(u.getSubscription());
					ui.setActivated(u.getActivated());
					ui.setStartdate(u.getStartdate());
					ui.setEnddate(u.getEnddate());
					
					userInfo.add(ui);
				}
				historyResponse.setStatus("SUCCESS");
				historyResponse.setUsers(userInfo);
			} else if(clas.equals("movies")){
				Timestamp s = new Timestamp(System.currentTimeMillis() - p*24*60*60*1000);
				List<StatsUsers> list = playHistoryRepository.findStatsMovies(s, PageRequest.of(0, 10));
				List<Integer> movieids = new ArrayList<Integer>();
				for(StatsUsers ph : list){
					movieids.add(ph.getPhis().getMovieid());
				}
				List<Movie> movieslist = movieRepository.findByMovieidIn(movieids);
				List<SearchMovie> movies = new ArrayList<SearchMovie>();
				for(Movie m : movieslist){
					SearchMovie s1 = new SearchMovie();
					s1.setMovieid(m.getMovieid());
					s1.setMovie(m.getMovie());
					s1.setTitle(m.getTitle());
					s1.setYear(m.getYear());
					s1.setStudio(m.getStudio());
					s1.setSynopsis(m.getSynopsis());
					s1.setImage(m.getImage());
					s1.setMovie(m.getMovie());
					s1.setActors(m.getActors());
					s1.setDirector(m.getDirector());
					s1.setCountry(m.getCountry());
					s1.setRating(m.getRating());
					s1.setAvailability(m.getAvailability());
					s1.setPrice(m.getPrice());
					movies.add(s1);
				}
				
				historyResponse.setStatus("SUCCESS");
				historyResponse.setMovies(movies);
			} else {
				historyResponse.setStatus("FAILURE");
				historyResponse.setMessage("invalid query");
			}
		} else {
			historyResponse.setStatus("FAILURE");
			historyResponse.setMessage("invalid query");
		}
		
		return historyResponse;
	}
}
