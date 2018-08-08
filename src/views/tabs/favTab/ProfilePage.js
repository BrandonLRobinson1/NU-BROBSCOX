import React, { Component } from 'react';
import { connect } from 'react-redux';
import FavoriteItem from './FavoriteItem';
import { Image, View, Text, StyleSheet, Dimensions, ScrollView, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, CardSection, Spinner, FullCard, SectionMedium, SectionSmall, Card } from '../../../common';
// import { updateFirstName, updateLastName, updateZipCode } from '../../store/signUp/SignUp'; 
import data from '../../../store/dummyMembers.json';
import { colors } from '../../../Colors';

// maybe favorites and available 

class ProfilePage extends Component {
  
  render() {
    const { imageStyle, title, imageContainer } = styles;
    console.log('xx', this.props)
    return (
      <Card>

        <CardSection style={{'height': 250}}>
          <View style={imageContainer}>
            <Image
              source={{ uri: "https://i.imgur.com/K3KJ3w4h.jpg"}}
              style={imageStyle}
            />
          </View>
        </CardSection>

        <CardSection style={title}>
          <View>
            <Text>Title</Text>
          </View>
          <View>
            <Text>Description</Text>
          </View>
        </CardSection>

        <CardSection style={title}>
          <View>
            <Text>Reviews Title</Text>
          </View>
          <View>
            <Text>Reviews</Text>
          </View>
          <View>
            <Text>see Reviews</Text>
          </View>
        </CardSection>

        <CardSection style={title}>
          <View>
            <Text>Reviews Title</Text>
          </View>
          <View>
            <Text>Reviews</Text>
          </View>
          <View>
            <Text>see Reviews</Text>
          </View>
        </CardSection>

        
      </Card>
    ); // TODO change if statements to if (!this.props.keyname)
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
)(ProfilePage);

const { NU_Red , NU_Blue, NU_White, NU_Grey } = colors;

const styles = StyleSheet.create({
  title: {
    backgroundColor: NU_Red,
    flex: 1,
    // width: 50,
    // height: 100,
  },
  imageContainer: { // this is how you would full screen an image **ORDER MATTERS****************************
    flex: 1,
    // height: '33%',
    // backgroundColor: NU_White,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  imageStyle: { // this is how you would full screen an image **ORDER MATTERS****************************
    // height: 90,
    // width: 90,
    // // borderRadius: 45,
    // margin: 2,


width: 'auto',
height: 'auto',
    minWidth: '100%',
    minHeight: '100%'
  },
  fullCardStyle: {
    overflow: 'scroll',
    width: '100%',
    height: 50,
  }
});


// <FullCard style={{height: "100%"}}>

//         <SectionMedium>
//           <View style={imageContainer}>
//             <Image
//               source={{ uri: "https://i.imgur.com/K3KJ3w4h.jpg"}}
//               style={imageStyle}
//             />
//           </View>
//         </SectionMedium>

//         <SectionSmall style={title}>
//           <View>
//             <Text>Title</Text>
//           </View>
//           <View>
//             <Text>Description</Text>
//           </View>
//         </SectionSmall>

//         <SectionSmall style={title}>
//           <View>
//             <Text>Reviews Title</Text>
//           </View>
//           <View>
//             <Text>Reviews</Text>
//           </View>
//           <View>
//             <Text>see Reviews</Text>
//           </View>
//         </SectionSmall>

//         <SectionSmall style={title}>
//           <View>
//             <Text>Reviews Title</Text>
//           </View>
//           <View>
//             <Text>Reviews</Text>
//           </View>
//           <View>
//             <Text>see Reviews</Text>
//           </View>
//         </SectionSmall>

        
//       </FullCard>