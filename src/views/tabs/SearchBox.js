import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { debounce } from 'lodash';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button, CardSection, Card, Input } from '../../common';
import { googlePlacesSuggestions } from '../../store/location/locationServices'; 
import { colors } from '../../Colors';

// TODO: fix DEBOUNCE ***************************************************** onChangeText={text => debounce(() => this.props.googlePlacesSuggestions(text), 800)}

class SearchBox extends Component {

  render () {
    const {  container } = styles
    console.log('searchAddress', this.props.searchAddress)
    return (
      <Card>
       <CardSection>
          <Input
            label="Address"
            placeholder="Address"
            value={this.props.searchAddress}
            clearTextOnFocus={false}
            onChangeText={text => this.props.googlePlacesSuggestions(text)}
            style={container}
          />
        </CardSection>
        {console.log('results component', this.props.predictions)}
      </Card>
    )
  }
}

export default connect(
  state => ({
    searchAddress: state.location.locationServices.searchAddress,
    predictions: state.location.locationServices.predictions
  }),
  {
    googlePlacesSuggestions
  }
)(SearchBox);

const { NU_Red , NU_Blue, NU_White, NU_Grey } = colors;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
    borderColor: NU_Blue
  }
});