import React, { Component } from 'react';
import { connect } from 'react-redux';
import FavoriteItem from './FavoriteItem';
import { Image, View, Text, StyleSheet, Dimensions, ScrollView, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, CardSection, Spinner, FullCard, SectionMedium, SectionSmall, Card, FlexContainer } from '../../../common';
// import { updateFirstName, updateLastName, updateZipCode } from '../../store/signUp/SignUp'; 
import data from '../../../store/dummyMembers.json';
import { colors, commonStyles } from '../../../Colors';

// maybe favorites and available 

class ProfilePage extends Component {
  
  render() {
    const { NU_Header_Text, horizontalFlex, NU_Paragraph_Text, NU_Small_Header_Text } = commonStyles;
    const { imageStyle, imageContainer } = styles;
    const { title, description, address : { street } } = this.props.personData;
    console.log('xx', this.props)
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
            <View>
              <Text style={NU_Header_Text}>
                {title}
              </Text>
            </View>

            <View>
              <Text style={NU_Paragraph_Text}>
                {description}
              </Text>
            </View>
          </View>
        </CardSection>

        <CardSection>
          <View style={horizontalFlex}>

            <View>
              <Text style={NU_Small_Header_Text}>
                address
              </Text>
            </View>
            <View>
              <Text style={NU_Paragraph_Text}>
                {street}
              </Text>
            </View>
            <View>
              <Text>see Reviews</Text>
            </View>
          </View>
        </CardSection>

        <CardSection>
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
   
  },
  imageContainer: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  imageStyle: {
    width: 'auto',
    height: 'auto',
    minWidth: '100%',
    minHeight: '100%'
  },
});
