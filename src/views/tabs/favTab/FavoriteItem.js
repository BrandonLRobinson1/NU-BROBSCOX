import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { AlbumCard, CardSection, Card, SectionSmall, SectionMedium, Button } from '../../../common';
// import { updateFirstName, updateLastName, updateZipCode } from '../../store/signUp/SignUp'; 
import { colors } from '../../../Colors';

class FavoriteItem extends Component {
  constructor(){
    super();
    this.state = {
    }

    this.thing = this.thing.bind(this);
  }

  componentWillMount() {
    // get data for favorites
  }

  thing () {
  }

  render() {
    const {  circleContainer, imageStyle, horizontalFlex, imageContainer, horizontalText, headerStyle } = styles;
    const { name, description, title, address: { city, state } } = this.props.personData;
    console.log('fav item props', this.props)
    return (
    
      <Card>
        <CardSection>
          <View style={imageContainer}>
            <Image
              source={{ uri: "https://i.imgur.com/K3KJ3w4h.jpg"}}
              style={imageStyle}
            />
          </View>
          
        </CardSection>

        <CardSection>
          <View style={horizontalFlex}>
            <View style={headerStyle}>  
              <Text>{title}</Text>
            </View>
            <View style={horizontalText}>  
              <Text>{description}</Text>
            </View>
          </View>
        </CardSection>

        <CardSection>
          <Button
            buttonText="View"
            onPress={() => {
              // console.log('Actions', Actions)
              Actions.pop();
              Actions.ProfilePage( {personData: this.props.personData} );
            }}
          />
        </CardSection>
      </Card>
    )
  }
}

export default connect(
  state => ({
    // firstName: state.signUp.SignUp.firstName,
    // lastName: state.signUp.SignUp.lastName,
    // zipCode: state.signUp.SignUp.zipCode
  }),
  {
    // updateFirstName,
    // updateLastName,
    // updateZipCode
  }
)(FavoriteItem);

const { NU_Red , NU_Blue, NU_White, NU_Grey, NU_Pink } = colors;

const styles = StyleSheet.create({
  circleContainer: {
    height: '13%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: NU_Grey
  },
  imageContainer: { // this is how you would full screen an image **ORDER MATTERS****************************
    flex: 1,
    backgroundColor: NU_White,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageStyle: { // this is how you would full screen an image **ORDER MATTERS****************************
    height: 90,
    width: 90,
    borderRadius: 45,
    margin: 2
  },
  horizontalFlex: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  headerStyle: {
    backgroundColor: NU_Pink,
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalText: {
    backgroundColor: NU_White,
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
});


// <CardSection>
//           <View style={imageContainer}>
//             <Image
//               source={{ uri: "https://i.imgur.com/K3KJ3w4h.jpg"}}
//               style={imageStyle}
//             />
//           </View>
//           <View style={horizontalFlex}>  
//             <Text>{name}</Text>
//           </View>
//         </CardSection>

//         imageContainer: { // this is how you would full screen an image **ORDER MATTERS****************************
//           flex: 1,
//           backgroundColor: NU_Blue,
//           height: 100,
//           width: 100,
//           alignItems: 'center',
//           justifyContent: 'center'
//         },
//         imageStyle: { // this is how you would full screen an image **ORDER MATTERS****************************
//           height: 80,
//           width: 80,
//         },
//         horizontalFlex: {
//           display: 'flex',
//           flexDirection: 'row',
//           backgroundColor: NU_Red,
//           flex: 2.5,
//           padding: 10
//         }


