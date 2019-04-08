import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';

import { citiesList } from './citiesList'
import {
  terraceWeather,
  deaseLakeWeather,
  fortNelsonWeather,
  princeGeorgeWeather,
  whistlerWeather,
  revelstokeWeather,
  crestonWeather
} from './citiesWeather'


const googleApiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;

const weather = {
  'Dease Lake': deaseLakeWeather(),
  'Fort Nelson': fortNelsonWeather(),
  'Terrace': terraceWeather(),
  'Prince George': princeGeorgeWeather(),
  'Whistler': whistlerWeather(),
  'Revelstoke': revelstokeWeather(),
  'Creston': crestonWeather(),
};

class GoogleMapsContainer extends React.Component {
  state = {
    showingInfoWindow: {},
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      showingInfoWindow: { [props.name]: true },
      selectedPlace: props.name,
      activeMarker: marker,
    });
  };

  marker = ({ coordinates, cityName }) => {
    return (
      <Marker
        key={cityName}
        onClick = {this.onMarkerClick}
        position = {coordinates}
        name = {cityName}
      />
    )
  };

  infoWindow = ({ cityName }) => {
    return (
      <InfoWindow
        key={cityName}
        marker = {this.state.activeMarker}
        visible = {this.state.showingInfoWindow[cityName]}
      >
        <p>{weather[cityName]}</p>
      </InfoWindow>
    )
  };

  renderMarker = ({ coordinates, name }) => this.marker({ coordinates, cityName: name });
  renderInfoWindow = ({ name }) => this.infoWindow({ cityName: name });

  render() {
    const style = {
      width: '100%',
      height: '100%',
      marginLeft: 'auto',
      marginRight: 'auto'
    };

    return (
      <Map
        style = {style}
        google = {this.props.google}
        zoom = {5}
        initialCenter = {{ lat: 53.7267, lng: -127.6476 }}
      >
        {citiesList.map(this.renderMarker)}
        {citiesList.map(this.renderInfoWindow)}
      </Map>
    );
  }
}

export default GoogleApiWrapper({apiKey: (googleApiKey)})(GoogleMapsContainer)
