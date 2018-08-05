import React, { Component } from 'react';
import { connect } from 'react-redux';
import FavoriteItem from './FavoriteItem';
import { View, Text, StyleSheet, Dimensions, ScrollView, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, CardSection, FullCard } from '../../../common';
// import { updateFirstName, updateLastName, updateZipCode } from '../../store/signUp/SignUp'; 
import data from '../../../store/dummyMembers.json';
import { colors } from '../../../Colors';


class Favorites extends Component {
  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(data); //**  data pulled from sample json!!
  }

  render() {
    if (!this.dataSource) return (<Text>Loading..</Text>);
    return (
      <ListView
        dataSource={this.dataSource}
        renderRow={(personData) => <FavoriteItem key={ Math.random() } personData={personData} />} // TODO: replace Math.random with personData.id
      />
    );
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
