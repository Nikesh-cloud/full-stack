package com.java.rest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.java.rest.entity.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long>{

	List<Restaurant> findByNameContainingOrCityContainingOrGenreContaining(String name, String city, String genre);
	
    @Query("select r.genre from Restaurant r")
	List<String> findAllGenre();
    
    @Query("select r.state from Restaurant r")
	List<String> findAllState();
}
