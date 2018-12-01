package com.moviecentral.mc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.moviecentral.mc.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	List<User> findByUsernameOrEmail(String username, String email);
	User findByUsername(String username);
	User findByEmail(String email);
}
