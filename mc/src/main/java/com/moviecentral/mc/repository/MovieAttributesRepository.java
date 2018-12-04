package com.moviecentral.mc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.moviecentral.mc.entity.MovieAttributes;

public interface MovieAttributesRepository extends JpaRepository<MovieAttributes, Integer> {

}
