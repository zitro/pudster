import React, { Component } from 'react';
// import MapContainer from './components/MapContainer'
import './App.css';
import SEARCHFORM from './components/SearchForm';
import MapContainer from './components/MapContainer'


class App extends Component {
	state={
		location:null,
		visible:false,
		tpLocations: []
	}


		fetchLocations = () => {
			let LOCATIONSURL =''

			if (this.state.location){
				LOCATIONSURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.location.lat},${this.state.location.lng}&radius=2500&type=overall&keyword=restroom&key=AIzaSyB-QdrzvR2sNlHBYZQjLe59ADkfmjQ3oRY`

				fetch(LOCATIONSURL)
					.then(res => res.json())
					.then(json => this.setTpLocation(json))
			}
		}

		setTpLocation = (json) => {
			this.setState ({
				tpLocations: json

			},() => console.log(this.state.tpLocations))

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
			/>
		}
	}
  render() {

    return (
      <div className="App">
				<header className="App-header">
					<img src="http://bryanortiz.me/t2.png" className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to Pudstr</h1>
				</header>
				<div className="Seachform">
					<SEARCHFORM grabLocation={this.grabLocation}/>
				</div>
				{this.setMapContainer()}
      </div>
    );
  }
}

export default App;
