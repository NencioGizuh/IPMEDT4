import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import BottomDrawerNavigation from './BottomDrawerNavigation';
import LabelBottomNavigation from './LabelBottomNavigation';
import SearchBar from './SearchBar';
import GoogleMaps from './GoogleMaps';
import LocationButton from "./LocationButton";
import StationsList from './StationsList';
import PaginaHeader from './PaginaHeader';
import MeldingenLijst from './MeldingenLijst';
import WebApiUtil from './WebApiUtil';
import TourGuide from './TourGuide';
import History from "./History";
import StationFaciliteiten from "./StationFaciliteiten";
import MarkerInfo from './MarkerInfo';
import ServiceWarning from './ServiceWarning';

function Index() {
    if (localStorage.getItem("TourGuide") === null) {
      localStorage.setItem('TourGuide', true);
    }
    var isTrue = (localStorage.getItem("TourGuide") === 'true');

    if (localStorage.getItem("WarningNetworkUsage") === null) {
      localStorage.setItem('WarningNetworkUsage', true);
    }

    var warning = (localStorage.getItem("WarningNetworkUsage") == 'true');

  return (
    <div>
      <WebApiUtil/>
      <LocationButton/>
      <BottomDrawerNavigation/>
      <SearchBar />
      <LabelBottomNavigation />
      <MarkerInfo />
      <TourGuide show={isTrue}/>
      <GoogleMaps />
      <ServiceWarning show={warning}/>
    </div>
  );
}

function MijnStationsPagina() {
  return (
    <div>
      <WebApiUtil/>
      <PaginaHeader title="Mijn Stations"/>
      <StationsList/>
    </div>
  );
}

function MeldingenPagina() {
  return (
    <div>
      <WebApiUtil/>
      <PaginaHeader title="Meldingen"/>
      <MeldingenLijst/>
    </div>
  );

}

function Faciliteiten() {
  return (
    <div>
    <PaginaHeader title="Faciliteiten"/>
    <StationFaciliteiten/>
    </div>
  )
}

function FaciliteitenHistorie() {
  return (
    <div>
    <PaginaHeader title="Historie"/>
    <History/>
    </div>
  );
}

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Index}/>
        <Route path="/mijn-stations/" component={MijnStationsPagina} />
        <Route path="/meldingen/" component={MeldingenPagina} />
        <Route path="/stationfaciliteiten" component={Faciliteiten} />
        <Route path="/faciliteitenhistorie" component={FaciliteitenHistorie} />
      </div>
    </Router>
  );
}

export default AppRouter;
