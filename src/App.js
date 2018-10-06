import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapComponent from './MapComponent'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="App-title">Tom's Neighborhood Map</h2>
        </header>
        <MapComponent google={this.props.google} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBRP9rsHODvbIvhyPNcege9fBqn27l9Aco")
})(App)
