import { handleActions, createAction } from 'redux-actions';
import { Dimensions } from 'react-native';

import { getRegionForCoordinates } from '../../helpers/helpersFunctions';

/// ***** helper function above is a way to get latitiud delta and longitude delta based on a number of points/markers
const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;

const latDelta = .0922;
const longDelta = aspectRatio * latDelta;
/// *****

const defaultState = {
  // full location obj
  userLocation: '',
  userLatitude: '',
  userLongitude: '',
  regionObj: {},
  // readyToRenderMap: false
};

const prefix = 'NU_STORE/LOCATION/';
export const setCurrentLocation = createAction(`${prefix}SET_CURRENT_LOCATION`);
export const setCurrentLatitude = createAction(`${prefix}SET_CURRENT_LATITUDE`);
export const setCurrentLongitude = createAction(`${prefix}SET_CURRENT_LONGITUDE`);
export const setReadyToRenderMap = createAction(`${prefix}SET_READY_TO_RENDER_MAP`);
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
    userLongitude: payload
  }),
  // [setReadyToRenderMap]: (state, { payload }) => ({
  //   ...state,
  //   readyToRenderMap: payload
  // }),
  [setRegionObj]: (state, { payload }) => ({
    ...state,
    regionObj: payload
  }),

}, defaultState);


export const getUserLocation = markersArray => (dispatch, getState) => {
  
    return navigator.geolocation.getCurrentPosition(
      position => {
        const { timestamp, coords: { latitude, longitude } } = position;
        // has to spit out region, can take in variables of array
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

        regionInfo.timeStamp = timestamp; // because its not a field added in the getRegionForCoordinates function so I add it here so its added for both every time - also if i decide the timestamp would make better sense elsewhere i can move it
        
        // need this to run test data
        // regionInfo.latitude = 45.52220671242907;
        // regionInfo.longitude = 122.6653281029795;
        // regionInfo.latitudeDelta = 0.04864195044303443;
        // regionInfo.longitudeDelta = 0.040142817690068;

        dispatch(setRegionObj(regionInfo));
        // dispatch(setReadyToRenderMap(true));

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
