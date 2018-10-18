import React, { Component } from 'react';
import { connect } from 'react-redux';
import RN, { Image, View, Text, StyleSheet, Dimensions, ScrollView, ListView, TouchableOpacity/*, Settings*/ } from 'react-native';
import SettingsTitle from './settingsItems/SettingsTitle';
import SettingsList from './settingsItems/SettingsList';
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

    this.redirect = this.redirect.bind(this);
    this.buildSettings = this.buildSettings.bind(this);
  }

  // eslint-disable-next-line
  redirect(location) {
    return Actions[location] ? Actions[location]() : console.log('not a destination');
  }

  // eslint-disable-next-line
  buildSettings(title, settingsArr) {
    return (
      <View>
        <SettingsTitle name={title} />
        {settingsArr.map((setting, i) => {
          const { name, sceneLocation } = setting;
          return <SettingsList name={name} sceneLocation={sceneLocation} key={`${name}-${i}`}/>
        })}
      </View>
    );
  }

  render() {
    const {
      NU_Header_Text,
      horizontalFlex,
      NU_Paragraph_Text,
      NU_Small_Header_Text
    } = commonStyles;

    const {
      imageStyle,
      container,
      body,
      // imageContainer,
      // flexCenter,
      // sectionalButtonStyle,
      // dividerStyle,
      // tabOff,
      // tabOn,
      // stickyBottom,
      // customAppointmentButton,
      // customAppointmentButtonText
    } = styles; // eslint-disable-line

    console.log('yooo');
    console.log('RN', RN);

    // const nameSettings = [
    //   {name: 'name', sceneLocation: 'name'},
    //   {name: 'location', sceneLocation: 'thingA'},
    //   {name: 'aboutMe', sceneLocation: 'thingB'},
    //   {name: 'contact', sceneLocation: 'thingB'}
    // ];

    const nameSettings = [
      { name: 'Account Info', sceneLocation: 'EditAccount' },
      { name: 'Change Email', sceneLocation: 'ChangeEmail' },
      { name: 'Reset Password', sceneLocation: 'EditAccount' },
      { name: 'Change Photo', sceneLocation: 'EditAccount' },
    ];

    const privacySettings = [
      { name: 'Privacy', sceneLocation: 'name' }
    ];

    const paymentSettings = [
      { name: 'CardInfo', sceneLocation: 'name' },
      { name: 'Plan', sceneLocation: 'name' }
    ];

    const support = [
      { name: 'Help Center', sceneLocation: 'name'},
      { name: 'Terms and Conditions', sceneLocation: 'thingA' },
      { name: 'Privacy Policy', sceneLocation: 'thingB' },
      { name: 'Email Us', sceneLocation: 'thingB' }
    ];

    return (
      <View style={container}>

        <View style={body}>
          <ScrollView>
            {this.buildSettings('Account', nameSettings)}
            {this.buildSettings('Privacy', privacySettings)}
            {this.buildSettings('Payment Info', paymentSettings)}
            {this.buildSettings('Support', support)}
            <Text>Log Out</Text>
            <Text>Version</Text>
          </ScrollView>
        </View>

      </View>
    );
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
  body: {
    flex: 1,
    marginBottom: 5
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
