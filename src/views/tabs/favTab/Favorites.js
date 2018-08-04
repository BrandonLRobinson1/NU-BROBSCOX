import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import FavoriteItem from './FavoriteItem';
import { Button, CardSection, FullCard } from '../../../common';
import data from '../../../store/dummyMembers.json';
// import { updateFirstName, updateLastName, updateZipCode } from '../../store/signUp/SignUp'; 
import { colors } from '../../../Colors';

class Favorites extends Component {
  constructor(){
    super();
    this.state = {
      errorMessage: ' ',
      loading: false
    }

    this.RenderFavorites = this.RenderFavorites.bind(this);
  }

  componentWillMount() {
    // get data for favorites
  }

  RenderFavorites () {
    return data.map( album => <FavoriteItem key={'x'} /> );
    // return (<FavoriteItem /> );
  }

  render() {
    const {  circleContainer } = styles
    return (
      <View>
        <ScrollView>
          {this.RenderFavorites()}
        </ScrollView>
      </View>
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
)(Favorites);

const { NU_Red , NU_Blue, NU_White, NU_Grey } = colors;

const styles = StyleSheet.create({
  circleContainer: {
    height: '13%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: NU_Grey
  }
});