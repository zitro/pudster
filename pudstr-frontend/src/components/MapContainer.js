import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import APIKEY from './Apikey'

export class MapContainer extends Component {
  state={
    selectedPlace:{name:"New York City"},
    currentCoordinates:{lat:40.7053,lng:-74.0140}
  }


  render() {
		console.log(this.props)
    return (
      <Map google={this.props.google} zoom={15} initialCenter={this.props.location} visible={true}>

        <Marker onClick={this.onMarkerClick}
              name={'Current location'} />

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

// var request = {
// 	location: pyrmont,
// 	radius: '500',
// 	types: ['restroom']
// };
