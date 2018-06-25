import React, { Component } from 'react';
// import bcrypt from 'bcrypt';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button, CardSection, Card, Input, Spinner } from '../../common';
import { updateEmail, updatePassword, signUserUp } from '../../store/signUp/SignUp'; 
import { emailRegEx, specialCharacterValidation } from '../../helpers/helpersFunctions';
import { colors } from '../../Colors';

class SignUp extends Component {
  constructor(){
    super();
    this.state = {
      errorMessage: '',
      clearTextOnFocus: false,
      useSecondPassword: false,
      pw1: '',
      pw2: '',
      loading: null
    }
    this.onButtonPress = this.onButtonPress.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  async onButtonPress() {
    const { pw1, pw2, clearTextOnFocus, useSecondPassword } = this.state;
    if (!emailRegEx(this.props.email)) return this.setState({errorMessage: 'The email address is badly formatted.'});
    if (pw1.length < 7) return this.setState({errorMessage: 'Password must be at least 7 characters'});
    if (!specialCharacterValidation(pw1) || !specialCharacterValidation(pw2)) return this.setState({errorMessage: 'Password must contain at least one special character'});
    if (pw1 !== pw2) return this.setState({errorMessage: 'Password do not match', pw1: '', pw2: '', clearTextOnFocus: true, useSecondPassword: true});
    
    // TODO: encrtypt password save it and clear it from state
    // const salt = bcrypt.genSaltSync(saltRounds);
    // const hash = bcrypt.hashSync(myPlaintextPassword, salt);
    // this.props.updatePassword(hash);
    this.props.updatePassword(`findout how to encrypt in front end ${pw1}`);

    this.setState({ loading: true });
    await this.props.signUserUp()
      .then(() => {
        this.setState({
          pw1: '',
          pw2: ''
        });
        this.props.updatePassword(null);
        Actions.SignUp();    
        this.setState({ loading: false });
      })
      .catch( (err) => {
        console.log('email sign in error', err);
        this.setState({ 
          errorMessage: err.message,
          loading: false
        });
      })
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size='large' />
    }
    return (
      <Button
        buttonText="Submit"
        onPress={() => this.onButtonPress()}
      />
    )
  }

  render() {
    const { circle, circleContainer, circleSelected, errorText  } = styles;

    return (
      <Card>

        <View style={circleContainer}>
          <View style={circleSelected} />
          <View style={circle} />
          <View style={circle} />
        </View>

        <CardSection>
          <Input
            label="Email"
            placeholder="Email Address"
            value={this.props.email}
            onChangeText={text => {
              this.setState({errorMessage: ''});
              this.props.updateEmail(text);
            }}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="Password"
            value={this.state.p1}
            clearTextOnFocus={this.state.clearTextOnFocus}
            onChangeText={text => {
              this.setState({
                errorMessage: '',
                pw1: text,
                clearTextOnFocus: false
              });
            }}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="Re-Enter Password"
            value={this.state.p2}
            clearTextOnFocus={this.state.useSecondPassword}
            onChangeText={text => {
              this.setState({
                errorMessage: '',
                pw2: text,
                useSecondPassword: false
              });
            }}
          />
        </CardSection>

        <CardSection>    
          {this.renderButton()}
        </CardSection>
        
        <CardSection>
          <Text style={errorText}>
            {this.state.errorMessage}
          </Text>
        </CardSection>

      </Card>
    )
  }
}

export default connect(
  state => ({
    email: state.signUp.SignUp.email,
    password: state.signUp.SignUp.password
  }),
  {
    updateEmail,
    updatePassword,
    signUserUp
  }
)(SignUp);

const { NU_Red , NU_Blue, NU_White, NU_Grey } = colors

const styles = StyleSheet.create({
  circle: {
    height: 12,
    width: 12,
    backgroundColor: NU_Blue,
    borderRadius: 25,
    margin: 5
  },
  circleSelected:{
    height: 12,
    width: 12,
    backgroundColor: NU_Red,
    borderRadius: 25,
    margin: 5
  },
  circleContainer: {
    height: '13%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: NU_Grey
  },
  errorText: {
    color: NU_Red,
    width: '100%',
    display: 'flex',
    textAlign: 'center'
  }
});
