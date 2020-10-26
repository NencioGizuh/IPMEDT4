import {
  CHANGE_SEARCHTERM,
  CHANGE_CURRENT_STATION,
  ADD_STATION,
  REMOVE_STATION,
  CHANGE_MAP_LOCATION,
  FETCH_STATIONS,
  ADD_FILTER,
  REMOVE_FILTER,
  ADD_FILTERS_TO_STATE,
  ADD_CATEGORIES_TO_STATE,
  TOGGLE_CATEGORY,
  CHANGE_USERLOCATION,
  SET_STATIONS,
  FETCH_MELDINGEN,
  FETCHED_DATA,
  CHANGE_SELECTED_MARKER,
  REMOVE_FROM_ALL,
  TOGGLE_MARKER_INFO,
  ADD_FILTER_TO_ALL,
  RESET_CATEGORIES_TO_SHOW,
  RESET_CATEGORIES,
  GET_FACILITATIONS,
  RESET_FACILITATIONS,
  ADD_FACILITATION,
  TOGGLE_SIDE_DRAWER,
  TOGGLE_BOTTOM_DRAWER,
  TOGGLE_USER_LOCATION_MARKER,
} from "./actions";

const initialState = {
  filtersToShow: [],
  allFilters: [],
  allCategories: [],
  categoriesToShow: [],
  showFacilitations: [],
  toggleSideDrawer: false,
  toggleBottomDrawer: false,

}


export const searchTerm = (state= "Leiden CS", action) => {
  switch(action.type){
    case CHANGE_SEARCHTERM:
      return action.payload;
    default:
    return state;
  }
}

export const currentStation = (state= "Leiden CS", action) => {
  switch(action.type){
    case CHANGE_CURRENT_STATION:
      return action.payload;
    default:
      return state;
  }
}

export const myStations = (state=[], action) => {
  switch(action.type){
    case SET_STATIONS:
      return action.payload;
    case ADD_STATION:
      state.push(action.payload);
      return state
    case REMOVE_STATION:
      state.splice(state.indexOf(action.payload), 1);
      const updatedItems = state.map(item => {
        return item;
      })
      return updatedItems
    default:
    return state;
  }
}

export const mapLocation = (state={lat: 52.166417, lng: 4.482079}, action) => {
  switch(action.type){
    case CHANGE_MAP_LOCATION:
      return action.payload;
    default:
      return state;
  }
}

export const stations = (state=[], action) => {
  switch(action.type){
    case FETCH_STATIONS:
      return action.payload;
    default:
      return state;
  }
}


export const filtersToShow = (state=initialState, action) => {
  switch (action.type) {
    case ADD_FILTER:
      return {
        filtersToShow: [...state.filtersToShow, action.payload]
      }
    case REMOVE_FILTER:
      const removedFilterFromShow = state.filtersToShow.filter(data => {
        return data !== action.payload
      })
      delete state.filtersToShow[action.payload]
      return {
        filtersToShow: removedFilterFromShow
      }
    default:
      return state;
    }
}

export const filtersToRemove = (state=initialState, action) => {
  switch (action.type) {
    default:
      return state;
    }
}
export const meldingen = (state=[], action) => {
  switch(action.type){
    case FETCH_MELDINGEN:
      return action.payload;
    default:
      return state;
  }
}


export const allFilters = (state=initialState, action) => {
  switch (action.type) {
    case ADD_FILTERS_TO_STATE:
      return {
        allFilters: [...state.allFilters, action.payload]
      }
    case ADD_FILTER_TO_ALL:
      return {
        allFilters: [...state.allFilters, action.payload]
      }
    case REMOVE_FROM_ALL:
      const removedFilterFromAll = state.allFilters.filter(data => {
        return data !== action.payload
      })
      delete state.allFilters[action.payload]
      return {
        allFilters: removedFilterFromAll
      }
    default:
      return state;
    }
  }

export const dataIsFetched = (state=false, action) => {
  switch(action.type){
    case FETCHED_DATA:
      return action.payload;
    default:
      return state;
  }
}


export const allCategories = (state=initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORIES_TO_STATE:
      return {
        allCategories: [...state.allCategories, action.payload]
      }
    case RESET_CATEGORIES:
      action.payload.checked = !action.payload.checked;
      return state;
    default:
      return state;
  }
}


//FUNCTIE VOOR HET HANDLEN VAN DE CATEGORY ON EN OFF AF, EN IMMUTABLE GEMAAKT.
export const categoriesToShow = (state=initialState, action) => {
  switch (action.type) {
    case TOGGLE_CATEGORY:
      action.payload.checked = !action.payload.checked;
      if (action.payload.checked === true){
        return {
          categoriesToShow: [...state.categoriesToShow, action.payload.categorie]
        }
      } else {
        const removedCategory = state.categoriesToShow.filter(data => {
          return data !== action.payload.categorie
        })
        delete state.categoriesToShow[action.payload.categorie]
        return {
          categoriesToShow: removedCategory
        }
      }
    case RESET_CATEGORIES_TO_SHOW:
      return {
        categoriesToShow: []
      }
    default:
      return state
  }
}


export const userLocation = (state={lng: 0.0,lat: 0.0}, action) => {
  switch(action.type){
  case CHANGE_USERLOCATION:
    return action.payload;
  default:
      return state;
  }
}

export const selectedMarker = (state={}, action) => {
  switch(action.type){
    case CHANGE_SELECTED_MARKER:
      return action.payload;
    default:
      return state;
  }
}

export const showMarkerInfo = (state=false, action) => {
  switch(action.type){
    case TOGGLE_MARKER_INFO:
      return action.payload;
    default:
      return state;
  }
}

export const showFacilitations = (state=initialState, action) => {
  switch(action.type){
    case GET_FACILITATIONS:
      return {
        showFacilitations: [...state.showFacilitations, action.payload]
      }
    case RESET_FACILITATIONS:
      return {
        showFacilitations: []
      }
     default:
       return state;
  }
}

export const myFacilitation = (state=[], action) => {
  switch(action.type){
    case ADD_FACILITATION:
      state.unshift(action.payload);
      if(state.length === 9) {
        state.pop(action.payload);
      }
      return state;
    default:
      return state;
  }
}

export const toggleSideDrawer = (state=initialState.toggleSideDrawer, action) => {
  switch(action.type){
    case TOGGLE_SIDE_DRAWER:
      return action.payload;
    default:
      return state;
  }
}

export const toggleBottomDrawer = (state=initialState.toggleBottomDrawer, action) => {
  switch(action.type){
    case TOGGLE_BOTTOM_DRAWER:
      return action.payload;
    default:
      return state;
  }
}

export const showUserLocationMarker = (state=false, action) => {
  switch(action.type){
    case TOGGLE_USER_LOCATION_MARKER:
      return action.payload;
    default:
      return state;
  }
}
