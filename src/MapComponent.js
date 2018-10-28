import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import locations from './locations.js';
import myMapStyles from './myMapStyles.js';

class MapComponent extends Component {

  state = {
    locations, //list imported from locations.js file
    markers: [],
    infowindow: new this.props.google.maps.InfoWindow(),
    profiles: [],
    search: '',
    error: null,
    initMapError: null
  }

  componentDidMount() {
    //Randomuser API to populate Local Guides image & name
    fetch('https://randomuser.me/api/?results=13').then(data => {
      if(data.ok) {
        return data.json()
      } else {
        throw new Error(data.statusText)
      }
    }).then(data => {
      this.setState({profiles: data.results})
      this.initMap()
      this.selectLocation()
    })
    .catch(e => {
      this.setState({error: e.toString()})
    })
  }

  initMap() {
    if (this.props && this.props.google) {
      const {google} = this.props
      const bounds = new google.maps.LatLngBounds() //builder to create a min bound based on set of LatLng points
      this.map = new google.maps.Map(ReactDOM.findDOMNode(this.refs.map), Object.assign({}, {
        center: {lat: 45.188529, lng: 5.724523999999974},
        zoom: 15,
        mapTypeId: 'terrain',
        styles: myMapStyles //styles imported from myMapStyles.js file
      }))
      let {infowindow} = this.state
      const {profiles} = this.state

      this.state.locations.forEach((location,pIndex) => {
        const marker = new google.maps.Marker({
          position: {lat: location.location.lat, lng: location.location.lng},
          map: this.map,
          animation: google.maps.Animation.DROP,
          title: location.name
        })
        //click listener to "toggle-click" animate the marker with Google's BOUNCE
        marker.addListener('click', () => {
          this.createInfoWindow(marker, infowindow, profiles[pIndex])
        })
        this.setState((state) => ({
          markers: [...state.markers, marker]
        }))
        bounds.extend(marker.position)
      })
      this.map.fitBounds(bounds)
    } else {
      this.setState({initMapError: "We're sorry, but there was a problem loading the map. Please check to make sure your API key is valid and try loading the map again"})
    }
  }

  selectLocation = () => {
    const {infowindow} = this.state
    const showInfoWindow = (event) => {
      const {markers} = this.state
      this.createInfoWindow(markers[markers.findIndex(marker => marker.title.toLowerCase() === event.target.innerText.toLowerCase())], infowindow, this.state.profiles[markers.findIndex(marker => marker.title.toLowerCase() === event.target.innerText.toLowerCase())])
    }
    document.querySelector('.locations-list').addEventListener('click', function (event) {
      if (event.target && event.target.nodeName === 'LI') {
        showInfoWindow(event)
        setTimeout( () => {
          infowindow.marker.setAnimation(null)
        }, 750)
      }
    })
    document.querySelector('.locations-list').addEventListener('keydown', function (event) {
      if (event.keyCode === 13) {
        showInfoWindow(event)
        setTimeout( () => {
          infowindow.marker.setAnimation(null)
        }, 750)
      }
    })
    document.querySelector('.locations-list').addEventListener('keydown', function (event) {
      if (event.keyCode === 27) {
        infowindow.close()
      }
    })
  }

  createInfoWindow = (marker, infowindow, profile) => {
    const {markers} = this.state
    const {google} = this.props
    if (infowindow.marker !== marker) {
      if (infowindow.marker) {
        markers[markers.findIndex(marker => marker.title === infowindow.marker.title)].setIcon(marker.getIcon())
      }
      infowindow.marker = marker
      infowindow.setContent(`<h3 tabIndex="2">${marker.title}</h3>
        <h4>Local Guide</h4>
        <img src="${profile.picture.large}" alt="local guide image">
        <div>${profile.name.first} ${profile.name.last}</div>
        <div>${profile.email}</div>`)
      infowindow.open(this.map, marker)
      infowindow.marker.setAnimation(google.maps.Animation.BOUNCE)
      setTimeout( () => {infowindow.marker.setAnimation(null)}, 750)
      infowindow.addListener('closeclick', function () {
        infowindow.marker = null
      })
    } else {
      window.alert("We're sorry, no results can be displayed at this time.");
    }
  }

  runSearch = (event) => {
    this.setState({search: event.target.value})
  }

  render() {
    const {locations, markers, search, infowindow} = this.state
    if(search) {
      locations.forEach((loc, idx) => {
        if(loc.name.toLowerCase().includes(search.toLowerCase())) {
          markers[idx].setVisible(true)
        } else {
          if(infowindow.markers === markers[idx]) {
            infowindow.close()
          }
          markers[idx].setVisible(false)
        }
      })
    } else {
      locations.forEach((loc, idx) => {
      if (markers[idx] && markers.length) {
        markers[idx].setVisible(true)
      }
    })
  }

    return (
      <div>
        {this.state.error ? (
          <div className="error">
            I'm sorry, but there seems to have been an error. Please reload the page. Thank you for your patience while we resolve this issue!
            {this.state.error}
          </div>):
          (<div className="container">
            <div className="locations-list">
              <ul className="locations">
                <li>
                  <input placeholder="Search for..." role="search" aria-label="search" type="text" value={this.state.value} onChange={this.runSearch} tabIndex="0"/>
                </li>
                {markers.filter(marker => marker.getVisible()).map((marker, key) =>
                (<li key={key} tabIndex="0">{marker.title}</li>))}
              </ul>
            </div>
            <div role="application" aria-label="locations-map-app" className="map" ref="map">
            Diese wunderbare Karte wird geladen...(This wonderful map is loading ;))
            {this.state.initMapError && <div className="error">{this.state.initMapError}</div>}
            </div>
          </div>)}
      </div>
    )
  }
}

export default MapComponent;
