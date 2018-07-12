import { handleActions, createAction } from 'redux-actions';

const defaultState = {
  userLocation: ''
};

const prefix = 'NU_STORE/LOCATION/';
export const setCurrentLocation = createAction(`${prefix}SET_CURRENT_LOCATION`);


export default handleActions({
  [setCurrentLocation]: (state, { payload }) => ({
    ...state,
    userLocation: payload
  }),

}, defaultState);


export const getUserLocation = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => dispatch(setCurrentLocation(position)),
      // position => console.log('postion', position),
      error => console.log('get location errr message:', error.message),
      { enableHighAccuracy: true, timeout: 40000, maximumAge: 2000 }
    );
  });
}


// How to pull real time data from firebase
// export const employeesFetch = () => {
//   const { currentUser } = firebase.auth();
//   return (dispatch) => {
//     firebase.database().ref(`/users/${currentUser.uid}/employees`)
//       .on('value', snapshot => {
//         console.log('cha ching ... payload', snapshot)
//         dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() })
//       })
//   }
// }