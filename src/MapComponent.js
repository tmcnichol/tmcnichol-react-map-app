import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom'

class MapComponent extends Component {

  state = {
    locations: [
      {name: "Google Boulder", location: {lat: 40.022227, lng: -105.254886}},
      {name: "Boulder Library", location: {lat: 40.014166, lng: -105.281780}},
      {name: "CU Boulder", location: {lat: 40.012438, lng: -105.270268}},
      {name: "Boulder Theater", location: {lat: 40.019477, lng: -105.277287}},
      {name: "BRC", location: {lat: 40.026080, lng: -105.256750}},
      {name: "Yoga Pod", location: {lat: 40.020616, lng: -105.253073}},
      {name: "Folsom Field", location: {lat: 40.009729, lng: -105.266926}},
      {name: "Community Cycles", location: {lat: 40.025825, lng: -105.248474}},
      {name: "Chautauqua", location: {lat: 39.999463, lng: -105.281478}},
      {name: "Bartaco", location: {lat: 40.017378, lng: -105.282086}},
      {name: "Sweet Cow", location: {lat: 40.025096, lng: -105.281170}},
      {name: "Barnsley Tire", location: {lat: 40.022023, lng: -105.262315}},
      {name: "Valmont Disc Golf", location: {lat: 40.028356, lng: -105.237393}}
    ],
    markers: [],
    infowindow: new this.props.google.maps.InfoWindow()
  }

  componentDidMount() {
    this.initMap()
    this.selectLocation()
  }

  initMap() {
    const {google} = this.props
    const bounds = new google.maps.LatLngBounds() //builder to create a min bound based on set of LatLng points
    this.map = new google.maps.Map(ReactDOM.findDOMNode(this.refs.map), Object.assign({}, {
      center: {lat: 45.188529, lng: 5.724523999999974},
      zoom: 13,
      mapTypeId: 'hybrid'
    }))
    this.state.locations.forEach((location) => {
      const marker = new google.maps.Marker({
        position: {lat: location.location.lat, lng: location.location.lng},
        map: this.map,
        title: location.name
      })
      this.setState((state) => ({
        markers: [...state.markers, marker]
      }))
      bounds.extend(marker.position)
    })
    this.map.fitBounds(bounds)
  }

  selectLocation = () => {
    const {infowindow} = this.state
    const showInfoWindow = (event) => {
      const {markers} = this.state
      this.createInfoWindow(markers[markers.findIndex(marker => marker.title.toLowerCase() === event.target.innerText.toLowerCase())], infowindow)
    }
    document.querySelector('.locations-list').addEventListener('click', function (event) {
      if (event.target && event.target.nodeName === 'LI') {
        showInfoWindow(event)
      }
    })
  }

  createInfoWindow = (marker, infowindow) => {
    const {markers} = this.state
    if (infowindow.marker !== marker) {
      if (infowindow.marker) {
        markers[markers.findIndex(marker => marker.title === infowindow.marker.title)].setIcon(marker.getIcon())
      }
      infowindow.marker = marker
      infowindow.setContent(`<h4>${marker.title}</h4>`)
      infowindow.open(this.map, marker)
      infowindow.addListener('closeclick', function () {
        infowindow.marker = null
      })
    }
  }

  render() {
    const {locations, markers} = this.state
    locations.forEach((loc) => {
      if (markers[loc]) {
        markers[loc].setVisible(true)
      }
    })

    return (
      <div>
        <div className="container">
          <div className="locations-list">
            <ul className="locations">{
              markers.filter(marker => marker.getVisible()).map((marker, key) =>
              (<li key={key}>{marker.title}</li>))
            }</ul>
          </div>
          <div role="application" className="map" ref="map"/>
        </div>
      </div>
    )
  }
}

export default MapComponent;
