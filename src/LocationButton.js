import React from 'react';
import Fab from '@material-ui/core/Fab';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import {geolocated} from "react-geolocated";
import {connect} from "react-redux";
import { changeUserlocation, changeMapLocation, toggleUserLocationMarker } from './actions';
import { withStyles } from '@material-ui/core/styles';

//Hier wordt de style gedefineerd voor het component
const styles = {
  fab: {
    position: 'absolute',
    left: 15,
    right: 0,
    bottom: 70,
    color: '#fff',
    backgroundColor: '#4286f4'
  },
}

class LocationButton extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      updateInterval: null,
      locationTrackingIsOn: false
    }
  }

  componentWillUnmount(){
    this.props.toggleUserLocationMarker(false);
    this.setState({locationTrackingIsOn: false});
    clearInterval(this.state.updateInterval);
  }

  //Deze functie haalt de locatie op via react-geolocated
  updateUserLocation = () => {
    if(!this.state.locationTrackingIsOn){
      this.setLocation();
      this.props.toggleUserLocationMarker(true);
      this.setState({locationTrackingIsOn: true});
      this.setState({updateInterval:
        setInterval(this.setLocation.bind(this),3000)
      });
    } else {
      this.props.toggleUserLocationMarker(false);
      this.setState({locationTrackingIsOn: false});
      clearInterval(this.state.updateInterval);
    }
  }

  setLocation = () => {
    const location = {lat: 0.0, lng: 0.0};
    location.lat = this.props.coords && this.props.coords.latitude;
    location.lng = this.props.coords && this.props.coords.longitude;
    this.props.changeUserlocation(location);
    if(!this.props.showUserLocationMarker){
      this.props.changeMapLocation(location);
    }
  }

  render() {
  const { classes } = this.props;

  return (
    <div>
      <Fab className={this.state.locationTrackingIsOn ? "locationButton active" : "locationButton"} color={this.props.locationTrackingIsOn ? 'secondary' : 'default'} onClick={this.updateUserLocation}>
          <MyLocationIcon className="locationButton__icon"/>
      </Fab>
    </div>
  );
  }
}

const mapStateToProps = state => {
  return {
    userLocation: state.userLocation,
    showUserLocationMarker: state.showUserLocationMarker
  }
}

//Hier gebeuren drie dingen
//Dit verbind het component met de store
export default connect(
  mapStateToProps,
  {
    changeUserlocation: changeUserlocation,
    changeMapLocation: changeMapLocation,
    toggleUserLocationMarker: toggleUserLocationMarker
    //Met geolocated kunnen we een verbinding maken met het react-geolocated package en de locatie doorsturen met props
  })(geolocated({
  positionOptions: {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: Infinity,
  },
      watchPosition: true,
      userDecisionTimeout: null,
      suppressLocationOnMount: false,
      geolocationProvider: navigator.geolocation,
      isOptimisticGeolocationEnabled: true
  //Hiermee kunnen we de style doorgeven aan andere componenten.
})(withStyles(styles)(LocationButton)));
