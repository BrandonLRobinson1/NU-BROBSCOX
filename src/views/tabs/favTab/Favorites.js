import React, { Component } from 'react';
import { connect } from 'react-redux';
import FavoriteItem from './FavoriteItem';
import { View, Text, StyleSheet, Dimensions, ScrollView, ListView } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import { Button, CardSection, FullCard, Spinner } from '../../../common';
// import { updateFirstName, updateLastName, updateZipCode } from '../../store/signUp/SignUp'; 
import data from '../../../store/dummyMembers.json';
import { colors } from '../../../Colors';

class Favorites extends Component {
   componentWillMount() {
    // will AUTOMATICALLY pull info from redux, sfetched as app loads
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(data); //**  data pulled from sample json!! WILL PULL FROM REDUX ON APP MOUNT => this.props.markerData
  }

  render() {
    if (!this.dataSource /* !this.props.markerData */) return (
      <FullCard>
        <Spinner />
      </FullCard>
    ); 
    return (
      <ListView
        dataSource={this.dataSource}
        renderRow={(personData) => <FavoriteItem key={Math.random()} personData={personData} />} // TODO: replace Math.random with personData.id
      />
    );
  }
}

export default connect(
  state => ({
    // firstName: state.signUp.SignUp.firstName,
  }),
  {
    // updateFirstName,
  }
)(Favorites);

// const { NU_Red , NU_Blue, NU_White, NU_Grey } = colors;

// const styles = StyleSheet.create({
//   circleContainer: {
//     borderBottomColor: NU_Grey
//   }
// });
