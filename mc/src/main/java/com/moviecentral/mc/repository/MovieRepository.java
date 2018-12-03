package com.moviecentral.mc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.moviecentral.mc.entity.Movie;

public interface MovieRepository extends JpaRepository<Movie, Integer> {

}
