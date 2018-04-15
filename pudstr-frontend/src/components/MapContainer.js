import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import APIKEY from './Apikey'

export class MapContainer extends Component {
	  state={
	  }
	onMarkerClick = (event) => {
		console.log(event.name)
	}

  render() {

	let locationMarkers = []
	if (this.props.tpLocations.results){
		 locationMarkers = this.props.tpLocations.results.map((location) => {
			 return <Marker
			 	key={location.id}
			 	icon={{
				 url: "http://bryanortiz.me/t2.png",
				 anchor: new window.google.maps.Point(32,32),
				 scaledSize: new window.google.maps.Size(64,64)
			 	}}
				onClick={this.onMarkerClick} name={'Pudster Location'} position={location.geometry.location} />
		 })
	}

    return (
		<div>
      <Map
				google={this.props.google}
				zoom={15}
				initialCenter={this.props.location}
				visible={true}>

        <Marker
					name={'You Are Here'}
					onClick={this.onMarkerClick}
					icon={{
						url: "http://bryanortiz.me/yahi1.png",
						anchor: new window.google.maps.Point(32,32),
						scaledSize: new window.google.maps.Size(64,64)
				 	}}
				 />
				{locationMarkers}

      </Map>
		</div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (APIKEY)
})(MapContainer)
