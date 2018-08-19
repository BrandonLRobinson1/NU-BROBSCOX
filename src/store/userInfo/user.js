import { handleActions, createAction } from 'redux-actions';
import firebase from 'firebase';

const defaultState = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  password: '',
  zipCode: '',
  email: '',

  profilePic: '',
  bio: 'bio',
  gender: '',
  dob: ''
};

const prefix = 'NU_STORE/USER_INFO/';
export const updateFirstName = createAction(`${prefix}UPDATE_FIRST_NAME`);
export const updateLastName = createAction(`${prefix}UPDATE_LAST_NAME`);
export const updatePhoneNumber = createAction(`${prefix}UPDATE_PHONE_NUMBER`);
export const updatePassword = createAction(`${prefix}UPDATE_PASSWORD`);
export const updateZipCode = createAction(`${prefix}UPDATE_ZIP_CODE`);
export const updateEmail = createAction(`${prefix}UPDATE_EMAIL`);

export const setProfilePic = createAction(`${prefix}SET_PROFILE_PIC`);
export const setBio = createAction(`${prefix}SET_BIO`);
export const setGender = createAction(`${prefix}SET_GENDER`);
export const setDob = createAction(`${prefix}SET_DOB`);

export const clearState = createAction(`${prefix}CLEAR_USER_STATE`);

export default handleActions({
  [updateFirstName]: (state, { payload }) => ({
    ...state,
    firstName: payload
  }),
  [updateLastName]: (state, { payload }) => ({
    ...state,
    lastName: payload
  }),
  [updatePhoneNumber]: (state, { payload }) => ({
    ...state,
    phoneNumber: payload
  }),
  [updatePassword]: (state, { payload }) => ({
    ...state,
    password: payload
  }),
  [updateZipCode]: (state, { payload }) => ({
    ...state,
    zipCode: payload
  }),
  [updateEmail]: (state, { payload }) => ({
    ...state,
    email: payload
  }),

  [setProfilePic]: (state, { payload }) => ({
    ...state,
    profilePic: payload
  }),
  [setBio]: (state, { payload }) => ({
    ...state,
    bio: payload
  }),
  [setGender]: (state, { payload }) => ({
    ...state,
    gender: payload
  }),
  [setDob]: (state, { payload }) => ({
    ...state,
    dob: payload
  }),
  [clearState]: (state, { payload }) => ({ // eslint-disable-line
    defaultState
  })

}, defaultState);

export const signUserUp = passWord => (dispatch, getState) => {
  // const { currentUser } = firebase.auth();
  console.log('hit signuserup');
  const {
    userInfo: {
      user: {
        email,
        password
      }
    }
  } = getState();
  return firebase.auth().createUserWithEmailAndPassword(email.toLowerCase(), password); // use return otherwise it will try to regulate password length
};

export const addFormInfo = () => (dispatch, getState) => {
  const { currentUser } = firebase.auth();
 
  const {
    userInfo: {
      user: {
        firstName,
        lastName,
        zipCode,
        phoneNumber,
        email
      }
    }
  } = getState();

  // console.log('firebase.auth', firebase.auth());
  // console.log('firebase database', firebase.database());
  // console.log('firebase ref', firebase.database().ref());
  // console.log('current user', currentUser);

  // TODO: SWITCH IT OFF TEST DATA FOLDER IN FIREBASE
  // return firebase.database().ref(`/users/${currentUser.uid}/testAccounts`)
  return firebase.database().ref(`/users/testAccounts/${currentUser.uid}`) // TODO ***** WILL HAVE SUBFOLDER LIKE USER INFO, LIKES ETC
    .push({
      firstName,
      lastName,
      email,
      zipCode,
      phoneNumber,
      logIns: 1,
      moreUsefulData: 'goes here'
    });
};


export const clearAll = () => (dispatch, getState) => {
  dispatch(updateFirstName(null));
  dispatch(updateLastName(null));
  dispatch(updatePhoneNumber(null));
  dispatch(updatePassword(null));
  dispatch(updateZipCode(null));
  dispatch(updateEmail(null));
};

// I assume this would work, load the info redux and have the app read from state
export const userInfoFetch = () => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    firebase.database().ref(`/users/testAccounts/${currentUser.uid}`) // dCpWn7CLu9bx3ZVEoBOx8bNdINT2
      .on('value', snapshot => {
        console.log('cha ching ... payload', snapshot.val());
      },
      error => console.log('err', error));
  };
};

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
