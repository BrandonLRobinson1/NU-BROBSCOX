import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'; // https://www.npmjs.com/package/react-native-google-places-autocomplete

// import { googlePlacesSuggestions } from '../../store/location/locationServices'; 
import { placesKey } from '../../../private';
import { colors } from '../../Colors';
 
// const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
// const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
 
class SearchAddress extends Component {

  render() {
    const { NU_Red , NU_Blue, NU_White, NU_Grey } = colors;
    const { textInputContainer, textInput, predefinedPlacesDescription } = styles;
    // styles={Object.assign({}, textInputContainer, textInput, predefinedPlacesDescription)}

    return (
      <GooglePlacesAutocomplete
        placeholder='Enter Location'
        minLength={2}
        autoFocus={false}
        returnKeyType={'search'}
        fetchDetails={true}
        currentLocationLabel="Current location"
        currentLocation={false}
        debounce={200}
        renderDescription={(row) => row.description}
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          console.log('search data logging', data);
          console.log('details logging', details);

          // THIS COMPONENT WILL BE USED FOR NAIL TECHS TO SAVE THIER CORRECT ADDRESS IN THE SYSTEM

          console.log('save selected address searched to redux', details.formatted_address)
          console.log('save lat and long to make map marker', details.geometry.location)
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: placesKey,
          types: 'address' // ** reponsible for filtering results
        }}
        styles={{
          textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth:0
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 38,
            color: '#5d5d5d',
            fontSize: 16
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          }
        }}
        renderDescription={(row) => { // custom description render
          // console.log('row desc', row.description)
          return row.description
        }}
        // **** other style
        // styles={{
        //   textInputContainer: {
        //     backgroundColor: 'rgba(0,0,0,0)',
        //     borderTopWidth: 0,
        //     borderBottomWidth:0
        //   },
        //   textInput: {
        //     marginLeft: 0,
        //     marginRight: 0,
        //     height: 38,
        //     color: 'red',
        //     fontSize: 16
        //   }
        // }}
        // predefinedPlaces={[homePlace, workPlace]}
        // GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          // location: {
          //     latitude: ,
          //     longitude: ,
          //   }
            // radius: 25,
            // rankby: 'distance',
            // types: 'street_address'
        // }}
      />
    );
  }
}

export default connect(
  state => ({
    
  }),
  {
    
  }
)(SearchAddress);


const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth:0
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 38,
    color: '#5d5d5d',
    fontSize: 16
  },
  predefinedPlacesDescription: {
    color: '#1faadb'
  },
});

// styles={[textInputContainer,textInput, predefinedPlacesDescription]}

// <GooglePlacesAutocomplete
//         placeholder='Search'
//         minLength={2} // minimum length of text to search
//         autoFocus={false}
//         returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
//         listViewDisplayed='auto'    // true/false/undefined
//         fetchDetails={true}
        // renderDescription={(row) => row.description} // custom description render
        // onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        //   console.log('search data logging', data);
        //   console.log('details logging', details);
        // }}
//         getDefaultValue={() => {
//           return ''; // text input default value
//         }}
//         query={{
//           // available options: https://developers.google.com/places/web-service/autocomplete
//           key: placesKey,
//           language: 'en', // language of the results
//           types: '(cities)' // default: 'geocode'
//           // types: '(address)' // default: 'geocode'
//         }}
//         styles={{
//           description: {
//             fontWeight: 'bold'
//           },
//           predefinedPlacesDescription: {
//             color: '#1faadb'
//           }
//         }}
  
//         currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
//         currentLocationLabel="Current location"
//         nearbyPlacesAPI={placesKey} // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
//         GoogleReverseGeocodingQuery={{
//           // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
//         }}
        // GooglePlacesSearchQuery={{
        //   // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        //   // location: {
        //   //   latitude: ,
        //   //   longitude: ,
        //   // }
        //   // radius: 25,
        //   rankby: 'distance',
        //   types: 'street_address'
        // }}
  
//         filterReverseGeocodingByTypes={['address']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
//         predefinedPlaces={[homePlace, workPlace]}
  
//         debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
//         renderLeftButton={() => <Text>Custom text after the inputg</Text>}
//         renderRightButton={() => <Text>Custom text after the inputg</Text>}
//       />