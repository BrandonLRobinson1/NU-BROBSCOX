import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
// import { Actions } from 'react-native-router-flux';
import { AlbumCard, CardSection, Card } from '../../../common';
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
    const {  circleContainer } = styles;
    return (
    
      <Card>
        <CardSection>
          <Text>yooo</Text>
          <View>
            <Image source={{ uri: "https://i.imgur.com/K3KJ3w4h.jpg"}}/>
          </View>
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



