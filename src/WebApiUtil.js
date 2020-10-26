import React from 'react';
import axios from 'axios';
import {connect} from "react-redux";
import {toggleCategory, fetchStations, fetchedData, setMyStations, addFiltersToState, addCategoriesToState, changeSearchTerm, changeCurrentStation, changeMapLocation, resetCategoriesToShow, resetCategories, getFacilitations} from './actions';

class WebApiUtil extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      dataIsFetched: false
    }
  }

  /*Onderstaande functie haalt de stations en filters uit de api en 'mijn stations' uit de localstorage.
  dit gebeurd alleen als desbetreffende data nog niet is opgehaald*/
  componentDidMount(){
   if(!this.props.dataIsFetched){
     axios.get("https://api.jordyhouwaart.nl/api/stations").then(res => {
       const stations = res.data.stations;
       this.props.fetchStations(stations);
       if(localStorage.getItem('current_station')){
         const currentStation = localStorage.getItem('current_station');
         this.props.changeCurrentStation(currentStation);
         this.props.changeSearchTerm(currentStation);
         for(let i = 0; i < stations.length; i++){
           if(stations[i].naam === currentStation){
             const locatie = stations[i].positie;
             locatie.lat = parseFloat(locatie.lat);
             locatie.lng = parseFloat(locatie.lng);
             this.props.changeMapLocation(locatie);
           }
         }
       }
     });

     if(localStorage.getItem('mijn_stations')){
       this.props.setMyStations(JSON.parse(localStorage.getItem('mijn_stations')));
     }

    axios.get("https://api.jordyhouwaart.nl/api/filters/1").then(resFilters => {
      var searcher = resFilters.data.filters;
      Object.keys(searcher).map(filterKeyName => {
        var filterObject = searcher[filterKeyName][0]; //Het object zelf
        this.props.addFiltersToState(filterObject)
      });

      resFilters.data.filterCategorieen.map(filter => {
        this.props.addCategoriesToState(filter)
        if (filter.categorie === 'Service'){
          this.props.toggleCategory(filter)
        }
      })
    });
    this.props.fetchedData(true);
  }


  this.props.resetCategoriesToShow();
  this.props.allCategories.allCategories.map(object => {
    if (object.checked === true){
      this.props.resetCategories(object)
      if (object.categorie === 'Service'){
        this.props.toggleCategory(object)
      }
    }
  });
 }


  render(){
    return(
      <div></div>
    )
  }
}

const mapStateToProps = state => {
  return {
    stations: state.stations,
    currentStation: state.currentStation,
    meldingen: state.meldingen,
    filters: state.filters,
    showFacilitations: state.showFacilitations,
    tempFilterCategorieen: state.filterCategorieen,
    dataIsFetched: state.dataIsFetched,
    allCategories: state.allCategories
  }
}

export default connect(
  mapStateToProps,
  {
    fetchStations: fetchStations,
    setMyStations: setMyStations,
    fetchedData: fetchedData,
    addFiltersToState: addFiltersToState,
    addCategoriesToState: addCategoriesToState,
    changeCurrentStation: changeCurrentStation,
    changeSearchTerm: changeSearchTerm,
    changeMapLocation: changeMapLocation,
    resetCategoriesToShow: resetCategoriesToShow,
    resetCategories: resetCategories,
    getFacilitations: getFacilitations,
    toggleCategory: toggleCategory,
  },
)(WebApiUtil);
