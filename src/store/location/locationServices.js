import { handleActions, createAction } from 'redux-actions';
import { Dimensions } from 'react-native';

import { getRegionForCoordinates } from '../../helpers/helpersFunctions';

/// ***** helper function above is a way to get latitiud delta and longitude delta based on a number of points/markers
const { width, height } = Dimensions.get('window');
const aspectRatio = width/ height;

const latDelta = .0922;
const longDelta = aspectRatio * latDelta;
/// *****

const defaultState = {
  // full location obj
  userLocation: '',
  userLatitude: '',
  userLongittude: '',
  regionObj: {}
};

const prefix = 'NU_STORE/LOCATION/';
export const setCurrentLocation = createAction(`${prefix}SET_CURRENT_LOCATION`);
export const setCurrentLatitude = createAction(`${prefix}SET_CURRENT_LATITUDE`);
export const setCurrentLongitude = createAction(`${prefix}SET_CURRENT_LONGITUDE`);
export const setRegionObj = createAction(`${prefix}SET_REGION_OBJ`);


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
    userLongittude: payload
  }),
  [setRegionObj]: (state, { payload }) => ({
    ...state,
    regionObj: payload
  }),

}, defaultState);


export const getUserLocation = markersArray => (dispatch, getState) => {
  
    return navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        // has to spit out region, can take in variables of array
        dispatch(setCurrentLocation(position));
        dispatch(setCurrentLatitude(latitude));
        dispatch(setCurrentLongitude(longitude));
        // create a region object for front end

        const regionObj = markersArray
          ? getRegionForCoordinates(markersArray)
          : {
                latitude,
                longitude,
                latitudeDelta: latDelta,
                longitudeDelta: longDelta
              };
        dispatch(setRegionObj(regionObj));
        return regionObj;
      },
      // // position => console.log('postion', position),
      error => console.log('get location errr message:', error.message),
      { enableHighAccuracy: true, timeout: 40000, maximumAge: 2000 }
    );

}
