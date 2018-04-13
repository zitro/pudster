import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import APIKEY from './Apikey'

export class MapContainer extends Component {
  state={
    selectedPlace:{name:"New York City"},
    // currentCoordinates:{lat:40.7053,lng:-74.0140}
  }


  render() {

	let locationMarkers = ''
	if (this.props.tpLocations.results.length > 0){
		 locationMarkers = this.props.tpLocations.results.map((location) => {
			 return <Marker key={location.id} onClick={this.onMarkerClick} name={'Pudsters'} position={location.geometry.location} />
		 })
	}

    return (
      <Map google={this.props.google} zoom={15} initialCenter={this.props.location} visible={true}>

        <Marker title={'stuff'} onClick={this.onMarkerClick}
              name={'Current location'}  />
				{locationMarkers}
				<Marker position={{lat: 40.7802446, lng: -73.96928799999999}} />
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (APIKEY)
})(MapContainer)
