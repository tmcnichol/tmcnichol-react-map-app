import React, { Component } from 'react';
import logo from './logo.svg';
import config from './config.js'
import './App.css';
import MapComponent from './MapComponent'
import { GoogleApiWrapper } from 'google-maps-react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo1" alt="logo" />
          <img src={logo} className="App-logo2" alt="logo" />
          <img src={logo} className="App-logo3" alt="logo" />
          <h2 className="App-title">Boulder Local Guides</h2>
        </header>
        <main>
          <MapComponent google={this.props.google} />
        </main>

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (config.MY_KEY)
})(App)
