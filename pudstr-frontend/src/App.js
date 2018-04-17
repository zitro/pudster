import React, { Component } from 'react';
// import MapContainer from './components/MapContainer'
import './App.css';
import SEARCHFORM from './components/SearchForm';
import MapContainer from './components/MapContainer';
import {Route, Link} from 'react-router-dom';
import UserLogin from './components/Userlogin';
import Comments from './components/Comments';
import './realappcssnotreally.css';


class App extends Component {
	state={
		location:null,
		visible:false,
		tpLocations: [],
		locked:true,
		matchTP:{},
		sidenav:false,
		comments:[],
		user:{}
	}


		fetchLocations = () => {
			let LOCATIONSURL =''

			if (this.state.location){
				LOCATIONSURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.location.lat},${this.state.location.lng}&radius=2500&type=overall&keyword=restroom&key=AIzaSyB-QdrzvR2sNlHBYZQjLe59ADkfmjQ3oRY`

				fetch(LOCATIONSURL)
					.then(res => res.json())
					.then(json => this.setTpLocation(json))

					fetch(`http://localhost:3000/comments`)
					.then(res=>res.json())
					.then(json=>this.setComments(json))

			}
		}

		setComments=(json)=>{
			this.setState({
				comments:json
			})
		}

		setTpLocation = (json) => {
			this.setState ({
				tpLocations: json

			},() => console.log(this.state.tpLocations))

		}

		setMatchTP=(matchTP)=>{
			this.setState({
				matchTP: matchTP
			})
		}

	grabLocation=(latLng)=>{
		this.setState({
			location:latLng,
			visible:true
		},()=> this.fetchLocations())
	}

	setMapContainer=()=>{
		if (this.state.location !== null){
			return <MapContainer
			location={this.state.location} visible={this.state.visible} tpLocations={this.state.tpLocations}
			setMatchTP={this.setMatchTP}
			/>
		}
	}

	unlock=()=>{
		this.setState({
			locked:false,
			sidenav:true
		},()=>console.log(this.state.locked))
	}

	setAppUser=(user)=>{
		// debugger
		this.setState({
			user
		})
	}

  render() {
    return (
      <div className="App">
				<header className="App-header">
				<Link to='/'>Exit</Link>
					<img src="https://vignette.wikia.nocookie.net/tfbnebs/images/d/d5/Toilet.png/revision/latest?cb=20140712011831" className="App-logo" alt="logo" />
					<h1 className="App-titles">Welcome to Pudstr</h1>
				</header>
				<Route exact path="/" render={()=><UserLogin unlock={this.unlock} setAppUser={this.setAppUser}/>}/>
				<div className="MainPage">
				<div className="Seachform">
					<Route exact path="/dash" render={()=><SEARCHFORM grabLocation={this.grabLocation} locked={this.state.locked}/>}/>
				</div>
				{this.setMapContainer()}
				</div>

				{this.state.sidenav ? <div className="sidenav">
				<div className="comments">
					<Comments matchTP={this.state.matchTP} comments={this.state.comments} user={this.state.user}/>
				</div>
				</div> : null}


      </div>
    );
  }
}

export default App;
