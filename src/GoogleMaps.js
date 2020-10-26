import React, { Component } from 'react';
import { GoogleMap} from '@react-google-maps/api';
import { LoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';
import {connect} from "react-redux";
import {changeSelectedMarker, toggleMarkerInfo, addFacilitation} from './actions';
import { myFacilitation } from './reducers';


class GoogleMaps extends Component {

  clickOnMarker = (filter) => {
    this.props.changeSelectedMarker(filter);
    this.props.toggleMarkerInfo(true);
    this.props.addFacilitation(filter);
  }

  render() {
     return (
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyC1--4YSfwwH_ZYnO1uhEDt8HAfWbfCXJI"
        /*AIzaSyC1--4YSfwwH_ZYnO1uhEDt8HAfWbfCXJI*/
      >
        <GoogleMap
          id='background-google-maps'
          zoom={18}
          center={this.props.mapLocation}
          clickableIcons={false}
          options={{
            streetViewControl: false,
            scaleControl: false,
            mapTypeControl: false,
            panControl: false,
            zoomControl: false,
            rotateControl: false,
            fullscreenControl: false,
            styles: [
                      {
                        featureType: "all",
                        elementType: "labels",
                        stylers: [
                          { visibility: "off" }
                        ]
                      }
                    ]
          }}
          disableDefaultUI
        >
        {this.props.filtersToShow.filtersToShow.map((filter,i) =>{
            return(
            <Marker
            clickable={true}
            onClick={() => this.clickOnMarker(filter)}
            position={{
              lat: filter.latitude,
              lng: filter.longitude
            }}
            icon={{
              url: filter.imageUrl,
              scaledSize: {height: 25, width: 25}
            }}
            >
            </Marker>
            )
          })}
          {this.props.showUserLocationMarker ?
            <Marker
              onLoad={marker => {
              }}
              position={this.props.userLocation}
                animation={2}
                icon={"/filters/location-icon.png"}
          /> : null}
        </GoogleMap>
      </LoadScript>
     )
  }
}

const mapStateToProps = state => {
  return {
    mapLocation: state.mapLocation,
    userLocation: state.userLocation,
    filtersToShow: state.filtersToShow,
    selectedMarker: state.selectedMarker,
    showUserLocationMarker: state.showUserLocationMarker
  }
}

export default connect(
  mapStateToProps,
  {
    changeSelectedMarker: changeSelectedMarker,
    toggleMarkerInfo: toggleMarkerInfo,
    addFacilitation: addFacilitation,
    myFacilitation: myFacilitation
  },
)(GoogleMaps);
