import React, { Component } from 'react';
import { connect } from 'react-redux';
import RN, { Image, View, Text, StyleSheet, Dimensions, ScrollView, ListView, TouchableOpacity, Settings } from 'react-native';
// import Favorites from '../favTab/Favorites';
import { CardSection, Spinner, Card } from '../../../common';
import { colors, commonStyles } from '../../../Colors';

// maybe favorites and available

// eslint-disable-next-line
class Setting extends Component {
  constructor() {
    super()
    this.state = {
    };
  }

  // should pull a fresh copy everytime you land on this page so on will mount might bee
  // overide sectional styles for some of these so like there isnt a line between the name and the picture
  render() {
    const {
      NU_Header_Text,
      horizontalFlex,
      NU_Paragraph_Text,
      NU_Small_Header_Text
    } = commonStyles;

    const {
      imageStyle,
      container
      // imageContainer,
      // scrollableBody,
      // flexCenter,
      // sectionalButtonStyle,
      // dividerStyle,
      // tabOff,
      // tabOn,
      // stickyBottom,
      // customAppointmentButton,
      // customAppointmentButtonText
    } = styles; // eslint-disable-line

    // const { tabSelected } = this.state;

    // console.log('favSelectHistory', typeof favSelectHistory, typeof imageContainer);


    // const { title, description, address: { street } } = this.props.personData; // eslint-disable-line

    console.log('yooo');
    console.log('Settings ', Settings);
    var value = Settings.get();
    console.log('value', value)

    return (
      <View style={container}>

        <View style={{}}>
          <Card>
            <CardSection>
              <View style={{}}>
                <Image
                  source={{uri: 'https://i.imgur.com/K3KJ3w4h.jpg'}}
                  style={imageStyle}
                />
              </View>
            </CardSection>

          </Card>


        </View>

      </View>
    ); // TODO change if statements to if (!this.props.keyname)
  }
};

export default connect(
  state => ({
    // favorites: state.userInfo.user.favorites,
  }),
  {
    // updateFirstName,
  }
)(Setting);

const { NU_Red , NU_Blue, NU_White, NU_Grey } = colors; // eslint-disable-line

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%'
  },
  scrollableBody: {
    flex: 9
    // marginBottom: 5
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
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  dividerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  sectionalButtonStyle: {
    flex: 1,
    textAlign: 'center'
  },
  tabOff: {
    color: NU_Grey
  },
  tabOn: {
    color: NU_Blue
  }
});
