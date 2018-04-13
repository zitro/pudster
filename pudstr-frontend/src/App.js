import React, { Component } from 'react';
// import MapContainer from './components/MapContainer'
import './App.css';
import APPTEST2 from './Apptest2';
import MapContainer from './components/MapContainer'


class App extends Component {
	state={
		location:null,
		visible:false
	}

	grabLocation=(latLng)=>{
		this.setState({
			location:latLng,
			visible:true
		},()=>console.log(this.state.location))
	}

	setMapContainer=()=>{
		if (this.state.location !== null){
			return <MapContainer location={this.state.location} visible={this.state.visible}/>
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
