import React, { Component } from 'react';
import './App.css';

import Pagination from './components/Pagination';

class App extends Component {
	
	constructor () {
		super();
		this.fetchResaurant = this.fetchResaurant.bind(this);
		this.fetchState = this.fetchState.bind(this);
		this.fetchGenre = this.fetchGenre.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.updateStateDetail = this.updateStateDetail.bind(this);
	}

  state = { allRestaurant: [], currentPage: 1, totalPages: null, filterGenre: "All", filterState: "All", search: "", totalRecords: 0, states: [], genres: [] }

  componentDidMount() {
    this.fetchResaurant("", "All", "All", 1);
	this.fetchState();
	this.fetchGenre();
  }

  onPageChanged = data => {
	this.setState({currentPage: data.currentPage})
    this.fetchResaurant(this.state.search, this.state.filterGenre, this.state.filterState, data.currentPage)
  }
  fetchResaurant(search, filterGenre, filterState, page) {
	  fetch( "http://localhost:8080/v1?search="+search + "&filterState=" +filterState+ "&filterGenre=" +filterGenre + "&page="+page , {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
		})        
		.then(response =>  response.json())
		.then((data) => {
			console.log(data)
			this.setState({allRestaurant: data.data, currentPage: data.page.page, totalPages: data.page.totalPage, totalRecords: data.page.totalRecords})
		}).catch((err)=> {console.log("something went wrong", err);})
  }
  
  fetchState() {
	  fetch( "http://localhost:8080/v1/state" , {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
		})        
		.then(response =>  response.json())
		.then((data) => {
			this.setState({states: data.data})
		}).catch((err)=> {console.log("something went wrong", err);})
  }
  fetchGenre() {
	  fetch( "http://localhost:8080/v1/genre" , {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
		})        
		.then(response =>  response.json())
		.then((data) => {
			this.setState({genres: data.data})
		}).catch((err)=> {console.log("something went wrong", err);})
  }
  handleSearchChange(e) {
	  
	  this.setState({search: e.target.value})
	  this.fetchResaurant( e.target.value, this.state.filterGenre, this.state.filterState, this.state.currentPage)
  }
  updateStateDetail(e) {
	  
	  this.setState({filterState: e.target.value})
	  this.fetchResaurant( this.state.search, this.state.filterGenre, e.target.value, this.state.currentPage)
  }
  updateGenreDetail(e) {
	  
	  this.setState({filterGenre: e.target.value})
	  this.fetchResaurant( this.state.search, e.target.value, this.state.filterState, this.state.currentPage)
  }
  

  render() {
    const { allRestaurant, currentPage, totalPages, totalRecords, states, genres, filterGenre, filterState } = this.state;
	
    const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();

    return (
      <div className="container mb-5">
        <div className="row d-flex flex-row py-5">

          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">

              <h2 className={headerClass}>
                <strong className="text-secondary">{totalRecords}</strong> Restaurant
              </h2>

              {/* currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{ ((currentPage-1)*10 + 1) +"-" +(currentPage*10) }</span> / <span className="font-weight-bold">{ totalPages }</span>
                </span>
              )*/}

            </div>
			{allRestaurant.length > 0? 
            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination totalRecords={this.state.totalRecords} pageLimit={10} pageNeighbours={1} onPageChanged={this.onPageChanged} />
            </div>
			: ""}
          </div>
			<div>
				<input type="text" name="search" value={this.state.search} onChange={(e)=> {this.handleSearchChange(e)}}/>
			</div>
		  <table id="restaurant">
			<thead>
				<tr>
					<td>Name</td>
					<td>Genre</td>
					<td>City</td>
					<td>State</td>
					<td>Phone Number</td>
				</tr>
			</thead>
			<tbody>
			<tr>
				<td></td>
				<td>
					<select custom name="genre" id="genre" value={filterGenre} onChange={(e) => {this.updateGenreDetail(e)}}>
						<option value="All">All</option>
						 { genres.map(gen => <option value={gen}>{gen}</option>) }
					</select>
				</td>
				<td></td>
				<td>
					<select custom name="state" id="state" value={filterState} onChange={(e) => {this.updateStateDetail(e)}}>
						<option value="All">All</option>
						 { states.map(st => <option value={st}>{st}</option>) }
					</select>
				</td>
			</tr>
			</tbody>
			{allRestaurant.length == 0 ? <tbody >No data found</tbody>:
				<tbody>
					
					{ allRestaurant.map(restaurant => <tr key={restaurant.id} >
						<td>{restaurant.name}</td>
						<td>{restaurant.genre}</td>
						<td>{restaurant.city}</td>
						<td>{restaurant.state}</td>
						<td>{restaurant.phoneNumber}</td>
					</tr>) }
					
				</tbody>
			}
		  </table>

        </div>
      </div>
    );
  }

}

export default App;
