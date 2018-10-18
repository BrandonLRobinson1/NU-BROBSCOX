import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button, CardSection, Card } from '../../common';
import { colors } from '../../Colors';

class Validate extends Component {
  constructor() {
    super();
    // this.state = {
    //   errorMessage: '',
    // }
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  render() {
    const { circleContainer } = styles; // eslint-disable-line
    return (
      <Card>

        <View style={circleContainer}>
          <Text>
            Validate text
          </Text>
        </View>

        <CardSection>
          <Button
            buttonText="Next"
            onPress={() => Actions.tabbar()}
          />
        </CardSection>

      </Card>
    );
  }
}

export default connect(
  state => ({
    // firstName: state.userInfo.user.firstName,
  }),
  {
    // updateFirstName,
  }
)(Validate);

const { NU_Red , NU_Blue, NU_White, NU_Grey } = colors; // eslint-disable-line

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
