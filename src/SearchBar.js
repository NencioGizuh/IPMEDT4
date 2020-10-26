import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Slide from '@material-ui/core/Slide';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TrainIcon from '@material-ui/icons/Train';
import SvgIcon from '@material-ui/core/SvgIcon';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SidebarNavigation from './SidebarNavigation';
import Snackbar from './Snackbar';
import {connect} from "react-redux";
import {changeSearchTerm, changeCurrentStation, addStation, changeMapLocation, setMyStations, resetFacilitations, toggleSideDrawer, toggleMarkerInfo} from './actions';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 300,
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    zIndex: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  listItems: {
    maxWidth: 300,
    margin: 'auto',
    padding: '0px 4px'
  }
};

class SearchBar extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      showAutocomplete: false,
      showBackground: false,
      suggestions: [],
      showFailAlert: false,
      showSuccesAlert: false,
      disableAddButton: false,
      snackbarTimeout: null,
    }
  }

  onOpenMenu = () => {
    SidebarNavigation.toggleDrawer();
  }

  /*onderstaande functie wordt bij elke keystroke aangeroepen, deze update vervolgens de state met de huidige searchterm en suggesties
  om vervolgens de autocomplete functie aan te roepen*/
  onKeyStroke = (event) => {
    this.props.changeSearchTerm(event.target.value);
    this.setState({suggestions: []}, this.autocomplete);
  };

  onSearch = (event) =>{
    for(let i = 0; i < this.props.stations.length; i++){
      if(this.props.stations[i].naam.toLowerCase() === this.props.searchTerm.toLowerCase()){
        this.props.changeCurrentStation(this.props.stations[i].naam);
        localStorage.setItem("current_station", this.props.stations[i].naam);
        this.changeMapLocation(this.props.stations[i].naam);
      }
    }
    this.hideBackground();
  };

  /*onderstaande functie wordt ook bij elke keystroke aangeroepen, maar pas na de onKeyStroke functie.
  Hier wordt gekeken of er stations zijn in de state die overeenkomen met wat de gebruiker heeft ingetypt.*/
  autocomplete = () => {
    if(this.props.searchTerm){
      let suggestions = [];
      for(let i = 0; i < this.props.stations.length; i++){
        if(this.props.stations[i].naam.toLowerCase().substring(0,this.props.searchTerm.length) === this.props.searchTerm.toLowerCase()){
          suggestions.push(this.props.stations[i].naam);
        }
      }
      for(let i = 0; i < this.props.stations.length; i++){
        if(this.props.searchTerm.length > 2 && this.props.stations[i].naam.toLowerCase().includes(this.props.searchTerm.toLowerCase()) && !suggestions.includes(this.props.stations[i].naam)){
          suggestions.push(this.props.stations[i].naam);
        }
      }
      if(suggestions.length !== 0){
        this.setState({showAutocomplete: true, suggestions: suggestions});
      } else this.setState({showAutocomplete: false});

    } else this.setState({showAutocomplete: false});
  };

  /*Onderstaande functie wordt aangeroepen bij het klikken op een suggestie, vervolgens worden de juiste states gezet die bij dat station horen.*/
  clickSuggestion = (station) => {
    this.props.changeSearchTerm(station);
    this.setState({showAutocomplete: false, suggestions: [], showBackground: false});
    this.props.changeCurrentStation(station);
    localStorage.setItem("current_station", station);
    this.changeMapLocation(station);
  }

  showBackground = () => {
    this.setState({showBackground: true});
    this.setState({showAutocomplete: false, laatstGezocht: this.laatstGezocht});
    this.props.toggleMarkerInfo(false);
  }

  hideBackground = () => {
    this.setState({showBackground: false});
  }

  /*Onderstaande functie wordt aangeroepen bij het klikken op het plus icoontje in de searchbar
  vervolgens wordt het huidige station toegevoegd aan de 'mijn stations' pagina*/
  addStation = () => {
    if(!this.props.myStations.includes(this.props.currentStation)){
      this.props.addStation(this.props.currentStation);
      localStorage.setItem('mijn_stations', JSON.stringify(this.props.myStations));
      this.showSuccesAlert();
    } else {
      this.showFailAlert();
    }
    this.setState({disableAddButton: true})
  }

  showFailAlert = () => {
    this.setState({showFailAlert: true});
    this.setState(
      {snackbarTimeout:
        setTimeout(function(){
            this.setState({showFailAlert:false});
            this.setState({disableAddButton:false});
        }.bind(this),3000)
      });
  }

  hideFailAlert = () => {
    clearTimeout(this.state.snackbarTimeout);
    this.setState({showFailAlert: false});
    this.setState({disableAddButton:false});
  }

  showSuccesAlert = () => {
    this.setState({showSuccesAlert: true});
    this.setState(
      {snackbarTimeout:
        setTimeout(function(){
            this.setState({showSuccesAlert:false});
            this.setState({disableAddButton:false});
        }.bind(this),3000)
      });
  }

  hideSuccesAlert = () => {
    clearTimeout(this.state.snackbarTimeout);
    this.setState({showSuccesAlert: false});
    this.setState({disableAddButton:false});
  }

  /*Onderstaande functie wordt aangeroepen als er een ander station geselcteerd wordt.
  De functie zorgt ervoor dat er gefocust wordt op het station dat geslecteerd is.*/
  changeMapLocation = (stationNaam) => {
    for(let i = 0; i < this.props.stations.length; i++){
      if(stationNaam.toLowerCase() === this.props.stations[i].naam.toLowerCase()){
        let locatie = this.props.stations[i].positie;
        locatie.lat = parseFloat(locatie.lat);
        locatie.lng = parseFloat(locatie.lng);
        this.props.changeMapLocation(locatie);
      }
    }
  }

  enter = (event) => {
    if(event.key === 'Enter'){
      this.onSearch();
    }
  }

  render(){
    const { classes } = this.props;

    return(
      <div>
        <Paper className={`${this.props.classes.root} ${"zoekveld"}`} elevation={1}>
          {this.state.showBackground ?
          <Button onClick={this.hideBackground}>
            <SvgIcon>
              <path xmlns="http://www.w3.org/2000/svg" d="M0 0h24v24H0z" fill="none"/>
              <path xmlns="http://www.w3.org/2000/svg" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </SvgIcon>
          </Button>
          : <SidebarNavigation onClick={(this.onOpenMenu)} />
          }
          <InputBase className={classes.input} placeholder="Zoek een station" onFocus={this.showBackground} onChange={this.onKeyStroke} onKeyDown={this.enter} value={this.props.searchTerm}/>
          <IconButton className={classes.iconButton} aria-label="Search" onClick={this.onSearch}>
            <SearchIcon />
          </IconButton>
          <IconButton className={`${this.props.iconButton} ${"station-toevoegen"}`} color="primary" onClick={this.addStation} disabled={this.state.disableAddButton}>
            <AddIcon />
          </IconButton>
        </Paper>

        {this.state.showFailAlert ? <Snackbar onCloseClick={this.hideFailAlert.bind(this)} variant="error" text="Dit station is al toegevoegd"/> : null}
        {this.state.showSuccesAlert ? <Snackbar onCloseClick={this.hideSuccesAlert.bind(this)} variant="info" text="Dit station is toegevoegd"/> : null}

        <Slide direction="up" in={this.state.showBackground} mountOnEnter unmountOnExit>
          <Paper className="background-autocomplete-list" onClick={this.hideBackground}>
          <List  className={[classes.listItems, "autocomplete-list" ]}>
          <h1>Zoekresultaten</h1>
            {this.state.suggestions.map(station => (
              <ListItem className="autocomplete-list__listItem" button key={station} onClick={() => this.clickSuggestion(station)}>
              <ListItemIcon>
                 <TrainIcon />
               </ListItemIcon>
              <ListItemText primary={station}/>
              </ListItem>
            ))}
          {this.state.suggestions.length === 0 &&
          <p className="station-lijst__empty">Zoek een station</p>
          }
          </List>
          <List  className={[classes.listItems, "autocomplete-list" ]}>
          <h1>Mijn Stations</h1>
            {this.props.myStations.map(station => (
              <ListItem className="listItem" button key={station} onClick={() => this.clickSuggestion(station)}>
              <ListItemIcon>
                 <TrainIcon />
               </ListItemIcon>
              <ListItemText primary={station} />
              </ListItem>
            ))}
          {this.props.myStations.length === 0 &&
          <p className="station-lijst__empty">Voeg een station toe om deze te weergeven</p>
          }
          </List>
         </Paper>
        </Slide>
      </div>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    searchTerm: state.searchTerm,
    currentStation: state.currentStation,
    myStations: state.myStations,
    stations: state.stations
  }
}

export default connect(
  mapStateToProps,
  {
    changeSearchTerm: changeSearchTerm,
    changeCurrentStation: changeCurrentStation,
    addStation: addStation,
    changeMapLocation: changeMapLocation,
    setMyStations: setMyStations,
    resetFacilitations: resetFacilitations,
    toggleSideDrawer: toggleSideDrawer,
    toggleMarkerInfo: toggleMarkerInfo,

  },
)(withStyles(styles)(SearchBar));
