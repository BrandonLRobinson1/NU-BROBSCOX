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

import Home from './src/views/tabs/Home';
import MapTab from './src/views/tabs/MapTab';

import SearchAddress from './src/views/tabs/SearchAddress';

import {colors } from './src/Colors';
// import CredentialsRouter from './src/views/getCredentials/index';

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
  {/*
      <Scene key="home" title="HOME" icon={tabIcon} >

          <Scene
            key="homeTab"
            title="HomeTab"
            component={Home}
            backTitle=" "
            
          />
        </Scene>
        component={SearchAddress}
  */}
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
        </Scene>

      </Scene>
     
    </Scene> 
  </Router>
);

export default RouterComponent;

// // <Scene
// // key="tabbar"
// // tabs
// // tabBarStyle={{backgroundColor: "fff"}}
// // type="reset"
// // >
// //   <Scene
// //     key="homeTab"
// //     component={Home}
// //     title="Home"
// //     backTitle=" "
// //     style={tabIcon}
// //     initial
// //   />
// //   <Scene
// //     key="mapTab"
// //     component={MapTab}
// //     title="Map"
// //     backTitle=" "
// //     initial
// //     style={tabIcon}            
// //     hideNavBar
// //   />

// // </Scene>


// // <Scene
// // key="credentials"
// // component={CredentialsRouter}
// // title="credentials"
// // initial
// // /> 

// // <Scene key="main">
// //         <Scene
// //           key="employeeList"
// //           component={EmployeeList}
// //           title="Employees"
// //           rightTitle="Add"
// //           onRight={() => Actions.employeeCreate()}
// //           initial
// //         />
// //         <Scene
// //           key="employeeCreate"
// //           component={EmployeeCreate}
// //           title="Create Employee"
// //         />
// //       </Scene>

// //     </Scene>

// import React from 'react';
// import { Scene, Router, Actions } from 'react-native-router-flux';
// import { Text } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import SignUp from './src/views/getCredentials/SignUp';
// import PhoneNumber from './src/views/getCredentials/PhoneNumber';
// import SignUpEmail from './src/views/getCredentials/SignUpEmail';
// import LogIn from './src/views/getCredentials/LogIn';
// import GetCredentials from './src/views/getCredentials/GetCredentials';
// import Validate from './src/views/getCredentials/Validate';

// import Home from './src/views/tabs/Home';
// import MapTab from './src/views/tabs/MapTab';

// import {colors } from './src/Colors';
// // import CredentialsRouter from './src/views/getCredentials/index';

// const { NU_Red, NU_Blue, NU_White, NU_Grey, NU_Black, NU_Border_Grey, NU_Card_Border } = colors;

// // conditionally render this page in sceens with a redux store that has defaults
// const tabIcon = ({ focused, title }) => {
//   // return (<Text style={{color: focused ? 'red' :'black'}}>{title}</Text>)
//   return (<Icon name="rocket" size={20} color={NU_Red} />);
// }

// const RouterComponent = () => (
//   <Router>
//     <Scene key="root">

//       <Scene
//         key="getCredentials"
//         component={GetCredentials}
//         title="Please Login"
//         hideNavBar
//         initial
//       />
//       <Scene
//         key="Email and Password"
//         component={SignUpEmail}
//         title="Create Account"
//         backTitle=" "
//       />
//       <Scene
//         key="SignUp"
//         component={SignUp}
//         title="Welcome to NU"
//         backTitle=" "
//         type="reset"
//       />
//       <Scene
//         key="Phone Number"
//         component={PhoneNumber}
//         title="Phone Number"
//         backTitle=" "
//       />
      
//       <Scene
//         key="Validate"
//         component={Validate}
//         title="Validate"
//         backTitle=" "
//       />
   
//       <Scene
//         key="logIn"
//         component={LogIn}
//         title="Please Login"
//         backTitle=" "
//       />   
  
//       <Scene
//         key="tabbar"
//         tabs
//         tabBarStyle={{backgroundColor: "blue"}}
//         type="reset"
//         hideNavBar
//         pressOpacity={1}
//         default="home"
//       >

//       <Scene key="home" title="HOME" icon={tabIcon} >

//           <Scene
//             key="homeTab"
//             title="HomeTab"
//             component={Home}
//             backTitle=" "
//             initial
//           />
//         </Scene>

//         <Scene key="map" title="MAP" icon={tabIcon} >
//           <Scene
//             key="mapTab"
//             title="MapTab"
//             component={MapTab}
//             backTitle=" "
//             initial
//             hideNavBar
//           />
//         </Scene>

//       </Scene>
     
//     </Scene> 
//   </Router>
// );

// export default RouterComponent;

// <Scene
// key="tabbar"
// tabs
// tabBarStyle={{backgroundColor: "fff"}}
// type="reset"
// >
//   <Scene
//     key="homeTab"
//     component={Home}
//     title="Home"
//     backTitle=" "
//     style={tabIcon}
//     initial
//   />
//   <Scene
//     key="mapTab"
//     component={MapTab}
//     title="Map"
//     backTitle=" "
//     initial
//     style={tabIcon}            
//     hideNavBar
//   />

// </Scene>


// <Scene
// key="credentials"
// component={CredentialsRouter}
// title="credentials"
// initial
// /> 

// <Scene key="main">
//         <Scene
//           key="employeeList"
//           component={EmployeeList}
//           title="Employees"
//           rightTitle="Add"
//           onRight={() => Actions.employeeCreate()}
//           initial
//         />
//         <Scene
//           key="employeeCreate"
//           component={EmployeeCreate}
//           title="Create Employee"
//         />
//       </Scene>

//     </Scene>