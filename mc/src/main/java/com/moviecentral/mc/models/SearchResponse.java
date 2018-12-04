package com.moviecentral.mc.models;

import java.util.List;



public class SearchResponse {

	private String status;
	private List<SearchMovie> movies;
	
	public SearchResponse(String status, List<SearchMovie> movies) {
		super();
		this.status = status;
		this.movies = movies;
	}
	
	public SearchResponse(){
		this.status = null;
		this.movies = null;
	}
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public List<SearchMovie> getMovies() {
		return movies;
	}
	public void setMovies(List<SearchMovie> movies) {
		this.movies = movies;
	}
}
