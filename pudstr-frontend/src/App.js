import React, { Component } from 'react';
// import MapContainer from './components/MapContainer'
import './App.css';
import APPTEST2 from './components/SearchForm';
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
				LOCATIONSURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.location.lat},${this.state.location.lng}&radius=10000&type=overall&keyword=restroom&key=AIzaSyB-QdrzvR2sNlHBYZQjLe59ADkfmjQ3oRY`

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
			return <MapContainer location={this.state.location} visible={this.state.visible} tpLocations={this.state.tpLocations}/>
		}
	}
  render() {

    return (
      <div className="App">
				<APPTEST2 grabLocation={this.grabLocation}/>
				{this.setMapContainer()}
      </div>
    );
  }
}

export default App;
