import { handleActions, createAction } from 'redux-actions';
import { Dimensions } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
// const { RNGooglePlaces } = require('react-native-google-places');

import { getRegionForCoordinates } from '../../helpers/helpersFunctions'; // helper function is a way to get latitiud delta and longitude delta based on a number of points/markers

/// *****
const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;

const latDelta = .0922;
const longDelta = aspectRatio * latDelta;
/// *****

const defaultState = {
  userLocation: '',
  userLatitude: '',
  userLongitude: '',
  regionObj: {},
  
  // googleplaces
  searchAddress: '',
  predictions: null
};

const prefix = 'NU_STORE/LOCATION/';
export const setCurrentLocation = createAction(`${prefix}SET_CURRENT_LOCATION`);
export const setCurrentLatitude = createAction(`${prefix}SET_CURRENT_LATITUDE`);
export const setCurrentLongitude = createAction(`${prefix}SET_CURRENT_LONGITUDE`);
export const setRegionObj = createAction(`${prefix}SET_REGION_OBJ`);

export const setAddress = createAction(`${prefix}SET_ADDRESS`);
export const setPredictions = createAction(`${prefix}SET_PREDICTIONS`);

export default handleActions({
  [setCurrentLocation]: (state, { payload }) => ({
    ...state,
    userLocation: payload
  }),
  [setCurrentLatitude]: (state, { payload }) => ({
    ...state,
    userLatitude: payload
  }),
  [setCurrentLongitude]: (state, { payload }) => ({
    ...state,
    userLongitude: payload
  }),
  [setRegionObj]: (state, { payload }) => ({
    ...state,
    regionObj: payload
  }),

  [setAddress]: (state, { payload }) => ({
    ...state,
    searchAddress: payload
  }),
  [setPredictions]: (state, { payload }) => ({
    ...state,
    predictions: payload
  }),

}, defaultState);


export const getUserLocation = markersArray => (dispatch, getState) => {
  
    return navigator.geolocation.getCurrentPosition(
      position => {
        const { timestamp, coords: { latitude, longitude } } = position;
        // getUserLocation has to spit out region, can take in variables of array
        dispatch(setCurrentLocation(position));
        dispatch(setCurrentLatitude(latitude));
        dispatch(setCurrentLongitude(longitude));
        
        // create a region object for front end
        const regionInfo = markersArray
          ? getRegionForCoordinates(markersArray)
          : {
              latitude,
              longitude,
              latitudeDelta: latDelta,
              longitudeDelta: longDelta
            };

        regionInfo.timeStamp = timestamp; // because its not a field added in the getRegionForCoordinates function so I add it here so its added for both every time - also if i decide the timestamp would make better sense elsewhere i can move it **also collect WHEN users are doing things patterns = data
        
        // need this to run test data
        // regionInfo.latitude = 45.52220671242907;
        // regionInfo.longitude = 122.6653281029795;
        // regionInfo.latitudeDelta = 0.04864195044303443;
        // regionInfo.longitudeDelta = 0.040142817690068;

        dispatch(setRegionObj(regionInfo));


        // ********** Testing purposes 
        const {
          location: {
            locationServices: {
              userLocation,
              userLatitude,
              userLongittude,
              regionObj
            }
          }
        } = getState();

      console.log('return from hell redux store',
        'loc', userLocation,
        'lat', userLatitude,
        'long', userLongittude,
        'reeeGEN-C', regionObj
      )
      // ********** Testing purposes 

        return regionInfo;
      },
      error => console.log('get location errr message:', error.message),
      { enableHighAccuracy: true, timeout: 40000, maximumAge: 2000 }
    );
}

export const googlePlacesSuggestions = (userInput) => (dispatch, getState) => {
  dispatch(setAddress(userInput));
  dispatch(getAddressSuggestions());
  
  // for testing
  //   const {
  //     location: {
  //       locationServices: {
  //         searchAddress
  //       }
  //     }
  //   } = getState();
  // console.log('wtf addy input', searchAddress, userInput)
}


//TODO: FIX ERROR - THERE IS SOMETHING WRONG WITH THE IMPORT RNGooglePlaces
// https://www.youtube.com/watch?v=otRaAhnXtSg&t=133s
export const getAddressSuggestions = () => (dispatch, getState) => {
  const {
    location: {
      locationServices: {
        searchAddress
      }
    }
  } = getState();

  // console.log('RNGooglePlaces1**', RNGooglePlaces.getAutocompletePredictions, RNGooglePlaces.getAutocompletePredictions('pizza', { country: 'MY'}));

  
  // console.log('RN**', RNGooglePlaces.getAutocompletePredictions(searchAddress, {
	//   type: 'establishments',
	//   latitude: 53.544389,
	//   longitude: -113.490927,
	//   radius: 10
  // }))

  if (searchAddress.length < 1) return;

  return RNGooglePlaces.getAutocompletePredictions(searchAddress, { country: 'MY'})
    // .then( results => dispatch(setPredictions(results)))
    .then( res => console.log('results', res))
    .catch( error => console.log('error', error.message))
}
