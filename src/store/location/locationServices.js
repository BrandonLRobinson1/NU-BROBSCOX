import { handleActions, createAction } from 'redux-actions';
import { Dimensions } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
// const { RNGooglePlaces } = require('react-native-google-places');

import { getRegionForCoordinates } from '../../helpers/helpersFunctions'; // helper function is a way to get latitiud delta and longitude delta based on a number of points/markers

/// *****
const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;

// const latDelta = .0922;
const latDelta = .0622;
const longDelta = aspectRatio * latDelta;
/// *****

// need to design this to grab info from every SESSION
const defaultState = {
  userLocation: '',
  userLatitude: '',
  userLongitude: '',
  // for google maps?
  regionObj: {},
  // googleplaces
  searchAddress: '',
  // need a total information object to collect all
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


}, defaultState);

