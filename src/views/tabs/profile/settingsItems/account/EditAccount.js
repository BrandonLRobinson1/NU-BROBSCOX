import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
// import { Actions } from 'react-native-router-flux';
import { Button, CardSection, Card, Input, Spinner } from '../../../../../common';
import { updateFirstName, updateLastName, updateZipCode, setBio } from '../../../../../store/userInfo/user';
import { emailRegEx, specialCharacterValidation } from '../../../../../helpers/helpersFunctions';
import { colors } from '../../../../../Colors';

class EditAccouunt extends Component {
  constructor() {
    super();
    this.state = {
      errorMessage: '',
      clearTextOnFocus: false,
      firstName: '',
      lastName: '',
      zip: '',
      bio: ''
    };
    this.onButtonPress = this.onButtonPress.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  componentWillMount() {
    //set local state to whats in redux
  }

  async onButtonPress() {
    const { firstName, lastName, zip, bio } = this.state;
    const { updateFirstName, updateLastName, updateZipCode, setBio } = this.props; // eslint-disable-line

    console.log('firstName, lastName, zip, bio', firstName, lastName, zip, bio);
    // validate and pass to thunk to update redux and send to firebase

  }

  renderButton() {
    if (this.state.loading) { // eslint-disable-line
      return <Spinner size="large" />;
    }
    return (
      <Button
        buttonText="Update"
        onPress={() => this.onButtonPress()}
      />
    );
  }

  render() {
    const { errorText } = styles; // eslint-disable-line
    const { clearTextOnFocus, errorMessage, firstName, lastName, zip, bio } = this.state;

    return (
      <Card>
        <CardSection>
          <Input
            label="First Name"
            placeholder="First Name"
            value={firstName}
            onChangeText={text => {
              this.setState({
                firstName: text,
                errorMessage: ''
              });
            }}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Last Name"
            placeholder="Last Name"
            value={lastName}
            onChangeText={text => {
              this.setState({
                lastName: text,
                errorMessage: ''
              });
            }}
          />
        </CardSection>

        <CardSection>
          <Input
            label="zip"
            placeholder="zip"
            value={zip}
            onChangeText={text => {
              this.setState({
                zip: text,
                errorMessage: ''
              });
            }}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Bio"
            placeholder="Bio"
            value={bio}
            onChangeText={text => {
              this.setState({
                bio: text,
                errorMessage: ''
              });
            }}
          />
        </CardSection>

        <CardSection>
          {this.renderButton()}
        </CardSection>

        <CardSection>
          <Text style={errorText}>
            {errorMessage}
          </Text>
        </CardSection>
      </Card>
    )
  }
}

export default connect(
  state => ({
    firstName: state.userInfo.user.firstName,
    lastName: state.userInfo.user.lastName,
    zipCode: state.userInfo.user.zipCode,
    profilePic: state.userInfo.user.profilePic,
    bio: state.userInfo.user.bio
  }),
  {
    updateFirstName,
    updateLastName,
    updateZipCode,
    setBio
  },
)(EditAccouunt);

// const { NU_Red , NU_Blue, NU_White, NU_Grey } = colors

const styles = StyleSheet.create({
  errorText: {
    // color: NU_Red,
    width: '100%',
    display: 'flex',
    textAlign: 'center'
  }
});