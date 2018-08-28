import { handleActions, createAction } from 'redux-actions';
import { Dimensions } from 'react-native';
import { getRegionForCoordinates } from '../../helpers/helpersFunctions'; // helper function is a way to get latitiud delta and longitude delta based on a number of points/markers

// *****
const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;
const latDelta = 0.0622; // 0.0922
const longDelta = aspectRatio * latDelta;
// *****

// need to design this to grab info from every SESSION
const defaultState = {
  regionObj: null,
  savedTechs: null,
  deltas: null
  // geoLocationObj: null,
};

const prefix = 'NU_STORE/LOCATION/';
export const setCurrentLocation = createAction(`${prefix}SET_CURRENT_LOCATION`);
export const setSavedTechs = createAction(`${prefix}SET_SAVED_TECHS`);
export const setDeltas = createAction(`${prefix}SET_DELTAS`);
// export const setGeoLocation = createAction(`${prefix}SET_GEO_LOCATION`);

export default handleActions({
  [setCurrentLocation]: (state, { payload }) => ({
    ...state,
    regionObj: payload
  }),
  [setSavedTechs]: (state, { payload }) => ({
    ...state,
    savedTechs: payload
  }),
  [setDeltas]: (state, { payload }) => ({
    ...state,
    deltas: payload
  })

  // [setGeoLocation]: (state, { payload }) => ({
  //   ...state,
  //   geoLocationObj: payload
  // }),
}, defaultState);

// should have one thunk package all the data i need for a users session and send it up, generator
export const getinitialDelta = () => (dispatch, getState) => {
// *** put a timeoout on the calls
  // const Images = [
  //   { uri: 'https://i.imgur.com/sNam9iJ.jpg' },
  //   { uri: 'https://i.imgur.com/N7rlQYt.jpg' },
  //   { uri: 'https://i.imgur.com/UDrH0wm.jpg' },
  //   { uri: 'https://i.imgur.com/Ka8kNST.jpg' }
  // ];

  const sfMarkers = [
    {
      coordinate: {
        latitude: 37.777067,
        longitude: -122.431512,
      },
      title: 'Best Place',
      description: 'This is the best place in Portland',
      // image: Images[0],
    },
    {
      coordinate: {
        latitude: 37.771096,
        longitude: -122.397195,
      },
      title: 'Second Best Place',
      description: 'This is the second best place in Portland',
      // image: Images[1],
    },
    {
      coordinate: {
        latitude: 37.758340,
        longitude: -122.410235,
      },
      title: 'Third Best Place',
      description: 'This is the third best place in Portland',
      // image: Images[2],
    },
    {
      coordinate: {
        latitude: 37.789820,
        longitude: -122.401999,
      },
      title: 'Fourth Best Place',
      description: 'This is the fourth best place in Portland',
      // image: Images[3],
    }
  ];

  const {
    userInfo: {
      user: {
        favorites
      }
    }
  } = getState();

  console.log('favorites and state', favorites, getState());

  // 0 and 1 are usless for calculation
  if (favorites.length < 2) return null;

  let allFavorites = favorites.map(marker => marker.coordinate);
  //
  // FIXXX NEXT LINE
  allFavorites = sfMarkers.map(marker => marker.coordinate); // because this test user isnt any good - WILL DELETE THIS AND USE LINE ABOVE
  // console.log('allFavorites', getRegionForCoordinates(allFavorites), allFavorites);
  const getDeltas = getRegionForCoordinates(allFavorites);
  const sendDeltas = {
    latitudeDelta: getDeltas.latitudeDelta,
    longitudeDelta: getDeltas.longitudeDelta
  };
  console.log('sendDeltas', sendDeltas)
  dispatch(setDeltas(sendDeltas));
  return sendDeltas;

  /*
  const sfMarker = [
    {
      coordinate: {
        latitude: 37.771096,
        longitude: -122.397195,
      },
      title: 'Second Best Place',
      description: 'This is the second best place in Portland',
      image: Images[1],
    }
  ];
  */

  // careful with variable name here!!!!!!!!!!!!!!!! ALSO find a way to avoid this when creating users
  // const markers = sfMarkers.map(marker => marker.coordinate);
  // return markers.length > 1
  //   ? getRegionForCoordinates(markers)
  //   : Object.assign(markers.coordinate, { latitudeDelta: latDelta, longitudeDelta: longDelta });
};

export const getActiveNailTechs = () => (dispatch, getState) => {
  console.log('get active nail techs run');
// *** put a timeoout on the calls bc theyre called every 4 seconds
  const Images = [
    { uri: 'https://i.imgur.com/sNam9iJ.jpg' },
    { uri: 'https://i.imgur.com/N7rlQYt.jpg' },
    { uri: 'https://i.imgur.com/UDrH0wm.jpg' },
    { uri: 'https://i.imgur.com/Ka8kNST.jpg' }
  ];

  const {
    userInfo: {
      user: {
        favorites // set favorites bc its a place holder for this
      }
    }
  } = getState();

  console.log('get active nail techs', favorites, getState());

  if (favorites.length) {
    const massagedData = [];
    favorites.map((person, i) => {
      person.image = Images[0];
      person.title = `best place ${i}`;
      person.description = 'This is the best place in Portland';
      massagedData.push(person);
    });
    console.log('massagedData', massagedData)
    return dispatch(setSavedTechs(massagedData));
  }
  return 0;

  /*  ------------------>>>      keep test data
  const sfMarkers = [
    {
      coordinate: {
        latitude: 37.777067,
        longitude: -122.431512,
      },
      title: 'Best Place',
      description: 'This is the best place in Portland',
      image: Images[0],
    },
    {
      coordinate: {
        latitude: 37.771096,
        longitude: -122.397195,
      },
      title: 'Second Best Place',
      description: 'This is the second best place in Portland',
      image: Images[1],
    },
    {
      coordinate: {
        latitude: 37.758340,
        longitude: -122.410235,
      },
      title: 'Third Best Place',
      description: 'This is the third best place in Portland',
      image: Images[2],
    },
    {
      coordinate: {
        latitude: 37.789820,
        longitude: -122.401999,
      },
      title: 'Fourth Best Place',
      description: 'This is the fourth best place in Portland',
      image: Images[3],
    }
  ];

  const sfMarker = [
    {
      coordinate: {
        latitude: 37.771096,
        longitude: -122.397195,
      },
      title: 'Second Best Place',
      description: 'This is the second best place in Portland',
      image: Images[1],
    }
  ];

  // careful with variable name here!!!!!!!!!!!!!!!! ALSO find a way to avoid this when creating users 
  const markers = sfMarkers;
  return markers;
  */
};
