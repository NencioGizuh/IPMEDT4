import {combineReducers, createStore} from 'redux';
import { toggleSideDrawer, toggleBottomDrawer, meldingen, dataIsFetched, searchTerm, currentStation, myStations, mapLocation, stations, filtersToShow, allFilters, allCategories, categoriesToShow, userLocation, selectedMarker, showMarkerInfo, showFacilitations, myFacilitation, showUserLocationMarker, filtersToRemove} from "./reducers";

export const store = createStore(combineReducers({
    searchTerm,
    currentStation,
    myStations,
    mapLocation,
    stations,
    filtersToShow,
    filtersToRemove,
    allFilters,
    allCategories,
    categoriesToShow,
    userLocation,
    meldingen,
    dataIsFetched,
    selectedMarker,
    showMarkerInfo,
    selectedMarker,
    showFacilitations,
    myFacilitation,
    toggleSideDrawer,
    toggleBottomDrawer,
    showUserLocationMarker
}));
