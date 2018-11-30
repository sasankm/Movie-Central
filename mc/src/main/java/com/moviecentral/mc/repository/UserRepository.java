package com.moviecentral.mc.repository;

import org.springframework.data.repository.CrudRepository;

import com.moviecentral.mc.entity.User;

public interface UserRepository extends CrudRepository<User, Integer> {

}
