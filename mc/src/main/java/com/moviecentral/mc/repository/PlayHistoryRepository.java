package com.moviecentral.mc.repository;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.moviecentral.mc.entity.Payment;
import com.moviecentral.mc.entity.PlayHistory;

public interface PlayHistoryRepository extends JpaRepository<PlayHistory, Integer> {

	@Query( "SELECT e FROM PlayHistory e WHERE e.date >=?1 AND e.date <=?2 group by e.userid") 
	ArrayList<PlayHistory> findUseridDateBetween(Timestamp s,Timestamp s1);

	List<PlayHistory> findByUserid(Integer userid);

	List<PlayHistory> findByMovieid(Integer id);
	
}
