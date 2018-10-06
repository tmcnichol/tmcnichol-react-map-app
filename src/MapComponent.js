import React, { Component } from 'react';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapComponent extends Component {
  render() {
    return (
      <div className="component">

        <Map google={this.props.google} zoom={14}>

          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />

          <InfoWindow onClose={this.onInfoWindowClose}>

          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default MapComponent;
