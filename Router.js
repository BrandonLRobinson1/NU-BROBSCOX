import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignUp from './src/views/getCredentials/SignUp';
import PhoneNumber from './src/views/getCredentials/PhoneNumber';
import SignUpEmail from './src/views/getCredentials/SignUpEmail';
import LogIn from './src/views/getCredentials/LogIn';
import GetCredentials from './src/views/getCredentials/GetCredentials';
import Validate from './src/views/getCredentials/Validate';

import Favorites from './src/views/tabs/favTab/Favorites';
import ProfilePage from './src/views/tabs/favTab/ProfilePage';

import MapTab from './src/views/tabs/map/MapTab';

import SearchAddress from './src/views/tabs/map/SearchAddress';

import {colors } from './src/Colors';
// import CredentialsRouter from './src/views/getCredentials/index';

// eslint-disable-next-line
const { NU_Red, NU_Blue, NU_White, NU_Grey, NU_Black, NU_Border_Grey, NU_Card_Border } = colors;

// conditionally render this page in sceens with a redux store that has defaults
const tabIcon = ({ focused, title }) => {
  // return (<Text style={{color: focused ? 'red' :'black'}}>{title}</Text>)
  return (<Icon name="rocket" size={20} color={NU_Red} />);
}

const RouterComponent = () => (
  <Router>
    <Scene key="root">
      {/*
      <Scene
        key="getCredentials"
        component={GetCredentials}
        title="Please Login"
        hideNavBar
        initial
      />
      <Scene
        key="Email and Password"
        component={SignUpEmail}
        title="Create Account"
        backTitle=" "
      />
      <Scene
        key="SignUp"
        component={SignUp}
        title="Welcome to NU"
        backTitle=" "
        type="reset"
      />
      <Scene
        key="Phone Number"
        component={PhoneNumber}
        title="Phone Number"
        backTitle=" "
      />

      <Scene
        key="Validate"
        component={Validate}
        title="Validate"
        backTitle=" "
      />

      <Scene
        key="logIn"
        component={LogIn}
        title="Please Login"
        backTitle=" "
      />
      */}
      <Scene
        key="tabbar"
        tabs
        tabBarStyle={{backgroundColor: "blue"}}
        type="reset"
        hideNavBar
        pressOpacity={1}
        default="mapTab"
      >
        <Scene key="favorites" title="Favorites" icon={tabIcon} >
          <Scene
            key="FavoritesTab"
            title="FavoritesTab"
            component={Favorites}
            initial
          />
        </Scene>

        <Scene key="map" title="MAP" icon={tabIcon} >
          <Scene
            key="mapTab"
            title="MapTab"
            component={MapTab}
            backTitle=" "
            initial
            rightTitle="Change Location"
            onRight={() => Actions.SearchAddress()}
          />
          <Scene
            key="SearchAddress"
            title="Address Search"
            component={SearchAddress}
            backTitle=" "
          />
          <Scene
            key="ProfilePage"
            title=""
            component={ProfilePage}
            backTitle=" "
            hideTabBar
          />
        </Scene>

      </Scene>

    </Scene>
  </Router>
);

export default RouterComponent;
