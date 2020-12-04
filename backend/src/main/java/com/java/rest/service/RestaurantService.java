package com.java.rest.service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.java.rest.dto.Page;
import com.java.rest.dto.Response;
import com.java.rest.entity.Restaurant;
import com.java.rest.repository.RestaurantRepository;

@Service
public class RestaurantService {
	@Autowired 
	RestaurantRepository restaurantRepository;
	
	public Response getRestaurantDetail(String search, int page,String filterState,String filterGenre) {
		Response response = new Response();
		List<Restaurant> restaurants = null;
		if(!StringUtils.isEmpty(search) ) {
			restaurants = restaurantRepository.findByNameContainingOrCityContainingOrGenreContaining(search, search, search);
		} else {
			restaurants = restaurantRepository.findAll();
		} 
		if(!StringUtils.isEmpty(filterState) && !"All".equalsIgnoreCase(filterState)) {
			restaurants = restaurants.stream().filter(x-> x.getState().equalsIgnoreCase(filterState)).collect(Collectors.toList());
		}
		if(!StringUtils.isEmpty(filterGenre) && !"All".equalsIgnoreCase(filterGenre)) {
			restaurants = restaurants.stream().filter(x-> x.getGenre().equalsIgnoreCase(filterGenre)).collect(Collectors.toList());
		}
		response.setPage(generatePagination(restaurants, page));
		response.setCode(200);
		if(!restaurants.isEmpty()) {
			int startIndex = (page-1)*10;
			int endIndex = (page)*10;
			endIndex  = (endIndex > restaurants.size())? restaurants.size(): endIndex; 
			startIndex = (startIndex > endIndex)? 0: startIndex;
			restaurants = restaurants.subList(startIndex, endIndex);
		}
		response.setData(restaurants);
		
		return response;
	}
	
	private Page generatePagination(List<Restaurant> restaurants, int currentPage) {
		Page page = new Page();
		page.setPage(currentPage);
		page.setTotalRecords(restaurants.size());
		if(restaurants.isEmpty()) {
			page.setTotalPage(0);
		}else {
			page.setTotalPage((int) Math.ceil(restaurants.size()/10));
		}
		return page;
	}
	
	public Response getAllGenre() {
		Response response = new Response();
		response.setCode(200);
		response.setData(restaurantRepository.findAllGenre());
		return response;
	}
	
	public Response getAllState() {
		Response response = new Response();
		response.setCode(200);
		response.setData(restaurantRepository.findAllState());
		return response;
	}
	
}
