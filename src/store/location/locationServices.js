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
  geoLocationObj: '',
  regionObj: {},
  // userLocation: '',
  // userLatitude: '',
  // userLongitude: '',
  // for google maps?
  // googleplaces
  // searchAddress: '',
  // need a total information object to collect all
};

const prefix = 'NU_STORE/LOCATION/';
export const setCurrentLocation = createAction(`${prefix}SET_CURRENT_LOCATION`);
export const setGeoLocation = createAction(`${prefix}SET_GEO_LOCATION`);
// export const setCurrentLatitude = createAction(`${prefix}SET_CURRENT_LATITUDE`);
// export const setCurrentLongitude = createAction(`${prefix}SET_CURRENT_LONGITUDE`);
// export const setRegionObj = createAction(`${prefix}SET_REGION_OBJ`);

// export const setAddress = createAction(`${prefix}SET_ADDRESS`);


export default handleActions({
  [setCurrentLocation]: (state, { payload }) => ({
    ...state,
    userLocation: payload
  }),
  [setGeoLocation]: (state, { payload }) => ({
    ...state,
    geoLocationObj: payload
  }),
  // [setCurrentLatitude]: (state, { payload }) => ({
  //   ...state,
  //   userLatitude: payload
  // }),
  // [setCurrentLongitude]: (state, { payload }) => ({
  //   ...state,
  //   userLongitude: payload
  // }),
  // [setRegionObj]: (state, { payload }) => ({
  //   ...state,
  //   regionObj: payload
  // }),
  // [setAddress]: (state, { payload }) => ({
  //   ...state,
  //   searchAddress: payload
  // }),


}, defaultState);

// should have one thunk package all the data i need for a users session and send it up

export const getActiveNailTechs = () => (dispatch, getState) => {
  const Images = [
    { uri: "https://i.imgur.com/sNam9iJ.jpg" },
    { uri: "https://i.imgur.com/N7rlQYt.jpg" },
    { uri: "https://i.imgur.com/UDrH0wm.jpg" },
    { uri: "https://i.imgur.com/Ka8kNST.jpg" }
  ];
  
  const originalMarkers =  [
    {
      coordinate: {
        latitude: 45.524548,
        longitude: -122.6749817,
      },
      title: "Best Place",
      description: "This is the best place in Portland",
      image: Images[0],
    },
    {
      coordinate: {
        latitude: 45.524698,
        longitude: -122.6655507,
      },
      title: "Second Best Place",
      description: "This is the second best place in Portland",
      image: Images[1],
    },
    {
      coordinate: {
        latitude: 45.5230786,
        longitude: -122.6701034,
      },
      title: "Third Best Place",
      description: "This is the third best place in Portland",
      image: Images[2],
    },
    {
      coordinate: {
        latitude: 45.521016,
        longitude: -122.6561917,
      },
      title: "Fourth Best Place",
      description: "This is the fourth best place in Portland",
      image: Images[3],
    },
  ];

  const sfMarkers = [
    {
      coordinate: {
        latitude: 37.777067,
        longitude: -122.431512,
      },
      title: "Best Place",
      description: "This is the best place in Portland",
      image: Images[0],
    },
    {
      coordinate: {
        latitude: 37.771096,
        longitude: -122.397195,
      },
      title: "Second Best Place",
      description: "This is the second best place in Portland",
      image: Images[1],
    },
    {
      coordinate: {
        latitude: 37.758340,
        longitude: -122.410235,
      },
      title: "Third Best Place",
      description: "This is the third best place in Portland",
      image: Images[2],
    },
    {
      coordinate: {
        latitude: 37.789820,
        longitude: -122.401999,
      },
      title: "Fourth Best Place",
      description: "This is the fourth best place in Portland",
      image: Images[3],
    },
  ];

  const sfMarker = [
    {
      coordinate: {
        latitude: 37.771096,
        longitude: -122.397195,
      },
      title: "Second Best Place",
      description: "This is the second best place in Portland",
      image: Images[1],
    }
  ];

  // careful with variable name here!!!!!!!!!!!!!!!!
  return sfMarkers.length > 0
    ? getRegionForCoordinates(sfMarkers)
    : Object.assign(sfMarkers.coordinate, {latitudeDelta: latDelta, longitudeDelta: longDelta});
}

