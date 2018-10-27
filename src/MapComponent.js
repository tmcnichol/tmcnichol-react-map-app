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
        styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]
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
                <input placeholder="Search for..." role="search" type="text" value={this.state.value} onChange={this.runSearch} tabIndex="1"/>
                {markers.filter(marker => marker.getVisible()).map((marker, key) =>
                (<li key={key} tabIndex="2">{marker.title}</li>))}
              </ul>
            </div>
            <div role="application" className="map" ref="map">
            Diese wunderbare Karte wird geladen...(This wonderful map is loading ;))
            {this.state.initMapError && <div className="error">{this.state.initMapError}</div>}
            </div>
          </div>)}
      </div>
    )
  }
}

export default MapComponent;
