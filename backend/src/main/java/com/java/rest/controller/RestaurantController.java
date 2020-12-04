package com.java.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.java.rest.dto.Response;
import com.java.rest.entity.Restaurant;
import com.java.rest.service.RestaurantService;

@CrossOrigin
@RestController
@RequestMapping("/v1")
public class RestaurantController {
	
	@Autowired
	RestaurantService restaurantService;

	 @GetMapping
	 public Response getRestaurant(@RequestParam(value = "search", defaultValue = "") String search,
			 @RequestParam(value = "page", defaultValue = "1") int page, 
			 @RequestParam(value = "filterState", defaultValue = "") String filterState,
			 @RequestParam(value = "filterGenre", defaultValue = "") String filterGenre) {
		if(page <= 0) {
			page = 1;
		}
		return (restaurantService.getRestaurantDetail(search, page, filterState, filterGenre));
	 }
	 
	 @GetMapping(path = "/genre")
	 public Response getGenre() {
		
		return (restaurantService.getAllGenre());
	 }
	 
	 @GetMapping(path = "/state")
	 public Response getState() {
		
		return (restaurantService.getAllState());
	 }
	
}
