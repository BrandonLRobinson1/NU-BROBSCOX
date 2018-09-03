import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, StyleSheet, Dimensions, ScrollView, ListView, TouchableOpacity } from 'react-native';
import Favorites from '../favTab/Favorites';
import { CardSection, Spinner, Card } from '../../../common';
import { colors, commonStyles } from '../../../Colors';

// maybe favorites and available

// eslint-disable-next-line
class UserProfile extends Component {
  constructor() {
    super()
    this.state = {
      tabSelected: 'favorites'
    };
    this.renderFavsAndHistory = this.renderFavsAndHistory.bind(this);
  }

  // eslint-disable-next-line
  renderFavsAndHistory () {
    // const thing = [];
    const thing = [1, 2, 3];
    return thing.length > 0
      ? (
        <ScrollView>
          <Favorites />
        </ScrollView>
      )
      : (
        <Text>
            you dont have any favorites yet
        </Text>
      );
  }

  tabSelect(selected) {
    return this.setState({ tabSelected: selected });
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
      imageContainer,
      container,
      scrollableBody,
      flexCenter,
      sectionalButtonStyle,
      dividerStyle,
      tabOff,
      tabOn,
      stickyBottom,
      customAppointmentButton,
      customAppointmentButtonText
    } = styles; // eslint-disable-line

    const { tabSelected } = this.state;

    const favSelectHistory = tabSelected === 'history' ? tabOn : tabOff;
    const favSelectFavorites = tabSelected === 'favorites' ? tabOn : tabOff;
    // console.log('favSelectHistory', typeof favSelectHistory, typeof imageContainer);

    // const { title, description, address: { street } } = this.props.personData; // eslint-disable-line

    return (
      <View style={container}>

        <View style={scrollableBody}>
            <Card>
              <CardSection>
                <View style={imageContainer}>
                  <Image
                    source={{uri: 'https://i.imgur.com/K3KJ3w4h.jpg'}}
                    style={imageStyle}
                  />
                </View>
              </CardSection>

              <CardSection>
                <View style={horizontalFlex}>
                  <View style={flexCenter}>
                    <Text>
                      Brandon Robinson
                    </Text>
                    <Text>
                      Charlotte, NC
                    </Text>
                  </View>
                </View>
              </CardSection>

              <CardSection>
                <View style={[horizontalFlex, flexCenter]}>
                  <View>
                    <Text style={NU_Small_Header_Text}>
                      About Me:
                    </Text>
                  </View>
                  <View>
                    <Text style={NU_Paragraph_Text}>
                      stuff
                    </Text>
                  </View>
                </View>
              </CardSection>

              <CardSection>
                <View style={[horizontalFlex, flexCenter]}>
                  <View>
                    <Text style={NU_Small_Header_Text}>
                      Contact Info
                    </Text>
                  </View>
                  <View>
                    <Text style={NU_Paragraph_Text}>
                      stuff
                    </Text>
                  </View>
                </View>
              </CardSection>

              <CardSection>
                <View style={[horizontalFlex, dividerStyle]}>
                  <Text
                    style={[NU_Small_Header_Text, sectionalButtonStyle, favSelectFavorites]}
                    onPress={() => this.tabSelect('favorites')}
                  >
                    Favorites
                  </Text>
                  <Text
                    style={[NU_Small_Header_Text, sectionalButtonStyle, favSelectHistory ]}
                    onPress={() => this.tabSelect('history')}
                  >
                    History
                  </Text>
                </View>
              </CardSection>

              <CardSection>
                {this.renderFavsAndHistory()}
              </CardSection>

            </Card>


        </View>

      </View>
    ); // TODO change if statements to if (!this.props.keyname)
  }
};

export default connect(
  state => ({
    // firstName: state.userInfo.user.firstName,
  }),
  {
    // updateFirstName,
  }
)(UserProfile);

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
