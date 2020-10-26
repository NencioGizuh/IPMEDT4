export const CHANGE_SEARCHTERM = 'CHANGE_SEARCHTERM';
export const CHANGE_CURRENT_STATION = 'CHANGE_CURRENT_STATION';
export const ADD_STATION = 'ADD_STATION';
export const REMOVE_STATION = 'REMOVE_STATION';
export const CHANGE_MAP_LOCATION = 'CHANGE_MAP_LOCATION';
export const FETCH_STATIONS = 'FETCH_STATIONS';
export const ADD_FILTER = 'ADD_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';
export const ADD_FILTERS_TO_STATE = 'ADD_FILTERS_TO_STATE';
export const ADD_CATEGORIES_TO_STATE = 'ADD_CATEGORIES_TO_STATE';
export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY';
export const CHANGE_USERLOCATION = 'CHANGE_USERLOCATION';
export const SET_STATIONS = 'SET_STATIONS';
export const FETCH_MELDINGEN = 'FETCH_MELDINGEN';
export const FETCHED_DATA = 'FETCHED_DATA';
export const CHANGE_SELECTED_MARKER = 'CHANGE_SELECTED_MARKER';
export const TOGGLE_MARKER_INFO = 'TOGGLE_MARKER_INFO';
export const REMOVE_FROM_ALL = 'REMOVE_FROM_ALL';
export const ADD_FILTER_TO_ALL = 'ADD_FILTER_TO_ALL';
export const RESET_CATEGORIES_TO_SHOW = 'RESET_CATEGORIES_TO_SHOW';
export const RESET_CATEGORIES = 'RESET_CATEGORIES';
export const GET_FACILITATIONS = 'GET_FACILITATIONS';
export const RESET_FACILITATIONS = 'RESET_FACILITATIONS';
export const ADD_FACILITATION = 'ADD_FACILITATION';
export const TOGGLE_SIDE_DRAWER = 'TOGGLE_SIDE_DRAWER';
export const TOGGLE_BOTTOM_DRAWER = 'TOGGLE_BOTTOM_DRAWER';
export const TOGGLE_USER_LOCATION_MARKER = 'TOGGLE_USER_LOCATION_MARKER';

export const setMyStations = stations => ({
  type: SET_STATIONS,
  payload: stations
});

export const fetchMeldingen = request => ({
  type: FETCH_MELDINGEN,
  payload: request
});

export const fetchedData = bool => ({
  type: FETCHED_DATA,
  payload: bool
})

export const changeUserlocation = location => ({
  type: CHANGE_USERLOCATION,
  payload: location
});

export const changeSearchTerm = searchTerm => ({
  type: CHANGE_SEARCHTERM,
  payload: searchTerm
});

export const changeCurrentStation = station => ({
  type: CHANGE_CURRENT_STATION,
  payload: station
});

export const addStation = station => ({
  type: ADD_STATION,
  payload: station
});

export const removeStation = station => ({
  type: REMOVE_STATION,
  payload: station
});

export const changeMapLocation = location => ({
  type: CHANGE_MAP_LOCATION,
  payload: location
});

export const fetchStations = request => ({
  type: FETCH_STATIONS,
  payload: request
});

export const addFilter = filterObject => ({
  type: ADD_FILTER,
  payload: filterObject
});

export const removeFilter = filterObject => ({
  type: REMOVE_FILTER,
  payload: filterObject
});

export const addFiltersToState = filterObject => ({
  type: ADD_FILTERS_TO_STATE,
  payload: filterObject
});

export const addCategoriesToState = filterObject => ({
  type: ADD_CATEGORIES_TO_STATE,
  payload: filterObject
});

export const toggleCategory = filterObject => ({
  type: TOGGLE_CATEGORY,
  payload: filterObject
});

export const changeSelectedMarker = filterObject => ({
  type: CHANGE_SELECTED_MARKER,
  payload: filterObject
});

export const toggleMarkerInfo = bool => ({
  type: TOGGLE_MARKER_INFO,
  payload: bool
});
export const removeFromAll = filterObject => ({
  type: REMOVE_FROM_ALL,
  payload: filterObject
})

export const addFilterToAll = filterObject => ({
  type: ADD_FILTER_TO_ALL,
  payload: filterObject
})

export const resetCategoriesToShow = filterObject => ({
  type: RESET_CATEGORIES_TO_SHOW,
  payload: filterObject
})

export const resetCategories = filterObject => ({
  type: RESET_CATEGORIES,
  payload: filterObject
})

export const getFacilitations = facilitations => ({
  type: GET_FACILITATIONS,
  payload: facilitations
})

export const resetFacilitations = resetObject => ({
  type: RESET_FACILITATIONS,
  payload: resetObject
})

export const addFacilitation = facilitation => ({
  type: ADD_FACILITATION,
  payload: facilitation
})

export const toggleBottomDrawer = value => ({
  type: TOGGLE_BOTTOM_DRAWER,
  payload: value
})

export const toggleUserLocationMarker = bool => ({
  type: TOGGLE_USER_LOCATION_MARKER,
  payload: bool
});

export const toggleSideDrawer = value => ({
  type: TOGGLE_SIDE_DRAWER,
  payload: value
})
