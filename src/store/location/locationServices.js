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
  regionObj: null
  // geoLocationObj: null,
};

const prefix = 'NU_STORE/LOCATION/';
export const setCurrentLocation = createAction(`${prefix}SET_CURRENT_LOCATION`);
// export const setGeoLocation = createAction(`${prefix}SET_GEO_LOCATION`);

export default handleActions({
  [setCurrentLocation]: (state, { payload }) => ({
    ...state,
    regionObj: payload,
  })
  // [setGeoLocation]: (state, { payload }) => ({
  //   ...state,
  //   geoLocationObj: payload
  // }),
}, defaultState);

// should have one thunk package all the data i need for a users session and send it up, generator
export const getinitialDelta = () => (dispatch, getState) => {
  const Images = [
    { uri: 'https://i.imgur.com/sNam9iJ.jpg' },
    { uri: 'https://i.imgur.com/N7rlQYt.jpg' },
    { uri: 'https://i.imgur.com/UDrH0wm.jpg' },
    { uri: 'https://i.imgur.com/Ka8kNST.jpg' }
  ];

  const {
    userInfo: {
      user: {
        favorites
      }
    }
  } = getState();

  console.log('favorites and state', favorites, getState());

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
  const markers = sfMarkers.map(marker => marker.coordinate);
  return markers.length > 1
    ? getRegionForCoordinates(markers)
    : Object.assign(markers.coordinate, { latitudeDelta: latDelta, longitudeDelta: longDelta });
};

export const getActiveNailTechs = () => (dispatch, getState) => {
  const Images = [
    { uri: 'https://i.imgur.com/sNam9iJ.jpg' },
    { uri: 'https://i.imgur.com/N7rlQYt.jpg' },
    { uri: 'https://i.imgur.com/UDrH0wm.jpg' },
    { uri: 'https://i.imgur.com/Ka8kNST.jpg' }
  ];

  let {
    userInfo: {
      user: {
        favorites // set favorites bc its a place holder for this
      }
    }
  } = getState();

  if (favorites.length) {
    const massagedData = [];
    favorites.map((person, i) => {
      person.image = Images[0];
      person.title = `best place ${i}`;
      person.description = 'This is the best place in Portland';
      massagedData.push(person)
    });
    return massagedData;
  }
 
  return favorites;

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
