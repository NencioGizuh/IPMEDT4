import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TrainIcon from '@material-ui/icons/Train';
import SvgIcon from '@material-ui/core/SvgIcon';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {connect} from "react-redux";
import {removeStation, changeCurrentStation, changeSearchTerm, changeMapLocation, setMyStations} from './actions';

const styles = {
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#ffffff',
  },
};

class StationsList extends React.Component{

  /*Onderstaande functie wordt aangeroepen als er op het prullenbak icoontje geklikt wordt. Deze zorgt ervoor dat het bijhorende station uit
  de lijst verwijderd wordt.*/
  removeStation = (item) => {
    this.props.removeStation(item);
    localStorage.setItem('mijn_stations', JSON.stringify(this.props.myStations));
  }

/*Onderstaande functie wordt aangeroepen als er op een station op de 'mijn stations' pagina geklikt wordt.
Deze functie set de juiste states aan de hand van het geselecteerde station*/
  selectStation = (station) => {
    this.props.changeCurrentStation(station);
    this.props.changeSearchTerm(station);

    localStorage.setItem("current_station", station);
    for(let i = 0; i < this.props.stations.length; i++){
      if(station === this.props.stations[i].naam){
        var locatie = this.props.stations[i].positie;
        locatie.lat = parseFloat(locatie.lat);
        locatie.lng = parseFloat(locatie.lng);
        this.props.changeMapLocation(locatie);
      }
    }
  }

  render(){
    return (
      <div className="stations-list">
        <p className="stations-list__info">Hier vindt u een overzicht van al uw stations:</p>
        <List component="ul">
        {this.props.myStations.map(station => (
          <ListItem button key={station}>
            <Button disableRipple={true} className="stations-list-li" onClick={() => this.selectStation(station)} component={Link} to="/">
              <ListItemIcon >
                 <TrainIcon />
               </ListItemIcon>
              <ListItemText onClick={() => this.selectStation(station)} primary={station}/>
            </Button>
            <SvgIcon className="delete-station-icon" onClick={() => this.removeStation(station)}>
              <path xmlns="http://www.w3.org/2000/svg" fill="none" d="M0 0h24v24H0V0z"/>
              <path xmlns="http://www.w3.org/2000/svg" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z"/>
            </SvgIcon>
          </ListItem>
        ))}
        </List>
        {this.props.myStations.length === 0 &&
          <p className="stations-list__empty">U heeft nog geen stations toegevoegd</p>
        }
      </div>
    );
  }
}

StationsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    myStations: state.myStations,
    stations: state.stations,
  }
}

export default connect(
  mapStateToProps,
  {
    removeStation: removeStation,
    changeCurrentStation: changeCurrentStation,
    changeSearchTerm: changeSearchTerm,
    changeMapLocation: changeMapLocation,
    setMyStations: setMyStations
  }
)(withStyles(styles)(StationsList));
