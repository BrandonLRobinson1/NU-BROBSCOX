import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, StyleSheet, Dimensions, ScrollView, ListView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, Spinner, Card } from '../../../common';
import { colors, commonStyles } from '../../../Colors';

// maybe favorites and available

// eslint-disable-next-line
class ProfilePage extends Component {

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
      stickyBottom,
      customAppointmentButton,
      customAppointmentButtonText
    } = styles; // eslint-disable-line

    const { title, description, address: { street } } = this.props.personData; // eslint-disable-line

    return (
      <View style={container}>

        <View style={scrollableBody}>
          <ScrollView>
            <Card>
              <CardSection>
                <View style={imageContainer}>
                  <Image
                    source={{uri: "https://i.imgur.com/K3KJ3w4h.jpg"}}
                    style={imageStyle}
                  />
                </View>
              </CardSection>

              <CardSection>
                <View style={horizontalFlex}>
                  <View>
                    <Text style={NU_Header_Text}>
                      {title}
                    </Text>
                  </View>

                  <View>
                    <Text style={NU_Paragraph_Text}>
                      {description}
                    </Text>
                  </View>
                </View>
              </CardSection>

              <CardSection>
                <View style={horizontalFlex}>
                  <View>
                    <Text style={NU_Small_Header_Text}>
                      address
                    </Text>
                  </View>
                  <View>
                    <Text style={NU_Paragraph_Text}>
                      {street}
                    </Text>
                  </View>
                  <View>
                    <Text>
                      map segment
                    </Text>
                  </View>
                </View>
              </CardSection>

              <CardSection>
                <View style={horizontalFlex}>
                  <View>
                    <Text style={NU_Small_Header_Text}>
                      Ratings
                    </Text>
                  </View>
                  <View>
                    <Text>
                      *******
                    </Text>
                  </View>
                  <View>
                    <Text>
                      see reviews
                    </Text>
                  </View>
                </View>
              </CardSection>

              <CardSection>
                <View style={horizontalFlex}>
                  <View>
                    <Text style={NU_Small_Header_Text}>
                      Services
                    </Text>
                  </View>
                  <View>
                    <Text style={NU_Paragraph_Text}>
                      blocklist of services
                    </Text>
                  </View>
                </View>
              </CardSection>

              <CardSection>
                <View style={horizontalFlex}>
                  <View>
                    <Text style={NU_Small_Header_Text}>
                      filler
                    </Text>
                  </View>
                  <View>
                    <Text style={NU_Paragraph_Text}>
                      filler
                    </Text>
                  </View>
                </View>
              </CardSection>
            </Card>
          </ScrollView>
        </View>

        <View style={stickyBottom}>
          <TouchableOpacity style={customAppointmentButton}>
            <Text style={customAppointmentButtonText}>
              nooo lisa.. whyyyy
            </Text>
          </TouchableOpacity>
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
)(ProfilePage);

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
  stickyBottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  customAppointmentButton: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: NU_White,
    borderColor: NU_Blue,
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5
  },
  customAppointmentButtonText: {
    color: NU_Blue,
    fontSize: 16,
    fontWeight: '600',
    padding: 12,
  },
  imageContainer: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  imageStyle: {
    width: 'auto',
    height: 'auto',
    minWidth: '100%',
    minHeight: '100%'
  }
});
