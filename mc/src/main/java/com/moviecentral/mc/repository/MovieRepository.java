package com.moviecentral.mc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.moviecentral.mc.entity.Movie;

public interface MovieRepository extends JpaRepository<Movie, Integer>,JpaSpecificationExecutor<Movie> {
//	String str = "(m.actors like )";
//	@Query("select m from Movie m join m.attributes a where a.value in (:values) and (m.year=:year or :year is null) and (m.actors like :str) group by m having count(m.movieid)=2")
//	List<Movie> findAllByValue(@Param("values")String[] values, @Param("year")Integer year, @Param("str")String str);
}
