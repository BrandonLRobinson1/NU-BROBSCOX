import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { connect } from 'react-redux';
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import { FullCard, Spinner } from '../../../common';
import { setCurrentLocation, getActiveNailTechs, getinitialDelta } from '../../../store/location/locationServices';
import { colors } from '../../../Colors';

const Images = [
  { uri: "https://i.imgur.com/sNam9iJ.jpg" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" }
];

/// phone dimensions *****
const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;
const latDelta = .0622; // .0922
const longDelta = aspectRatio * latDelta;
/// *****

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

class Maptab extends Component {
    constructor() {
      super();

      this.state = {
        markers: null,
        initialPosition: null,
      };

      this.renderMarkers =  this.renderMarkers.bind(this);
      this.renderCards =  this.renderCards.bind(this);
      this.onCardClick = this.onCardClick.bind(this);
      this.customMarker = this.customMarker.bind(this);
    }
  
    async componentDidMount() {
      const markers = await this.props.getActiveNailTechs();
      const init = this.props.getinitialDelta(); // depends on markers and must fire after markers complete
      console.log('mawk', markers, init);
      // *** above should be called before this component loads

      const dt = new Date();
      const utcDate = dt.toUTCString(); // unique timestamp with date

      // if you come to the map with no address loaded it grabs current location *** TODO:// set cases for no location services
      if (!this.props.regionObj) {
        navigator.geolocation.getCurrentPosition(position => {
          const latitude = parseFloat(position.coords.latitude);
          const longitude = parseFloat(position.coords.longitude);

          const initialRegion = {
            latitude,
            longitude,
            latitudeDelta: latDelta,
            longitudeDelta: longDelta,
            timeStamp: utcDate // may want to assiociate timestamp with sessions
          };

          this.setState({
            // initialPosition: init, // if you want ur stRTING POINT TO BE A central location beteen markers and not yourself
            initialPosition: initialRegion,
            markers
          });

          this.props.setCurrentLocation(initialRegion);
        },
        error => console.error(JSON.stringify(error)),
        { enableHighAccuracy: true, timeout: 40000, maximumAge: 2000 }
      )

      this.watchID = navigator.geolocation.watchPosition(position=> {
        const latitude = parseFloat(position.coords.latitude);
        const longitude = parseFloat(position.coords.longitude);

        const lastRegion = {
          latitude,
          longitude,
          latitudeDelta: latDelta,
          longitudeDelta: longDelta,
          timeStamp: utcDate
        }

        this.setState({
          initialPosition: lastRegion,
        });

      });
    } else {
      // currently only works for address of home (skinner)
      const initialRegion = {
        latitude: this.props.regionObj.lat,
        longitude: this.props.regionObj.lng,
        latitudeDelta: .6622, // need to run something to actually get lat and long delta ( as well as markers )
        longitudeDelta: 0.034317000000001485,
      }

      this.setState({
        initialPosition: initialRegion,
        markers: [
          {
            coordinate: {
              latitude: 30.293536,
              longitude: -81.603096,
            },
            title: "Second xxxx Place",
            description: "This is the second best place in Portland",
            image: Images[1],
          },
          {
            coordinate: {
              latitude: 30.393536,
              longitude: -81.803096,
            },
            title: "3rd",
            description: "This is it",
            image: Images[2],
          }
        ]
      });
    }

    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          // changes the region you animate too and keeps your deltas *****
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.initialPosition.latitudeDelta,
              longitudeDelta: this.state.initialPosition.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
    navigator.geolocation.clearWatch(this.watchID);
  }

  customMarker() {
    const { customMarkerShell, customMarker, customMarkerText, customMarkerTailShell, customMarkerTail } = styles;
    return (
        <View style={customMarkerShell}>
          <View style={customMarker}>
              <Text style={customMarkerText}> NU</Text>
          </View>
          <View style={customMarkerTailShell}>
              <View style={customMarkerTail}/>
          </View>
        </View>
    );
  }

  renderMarkers(marker, index) {
    const { markerWrap, markerSize } = styles;
    // this is the snippet of code that is reponsible for what paticlular marker is zoomed in on
    const interpolations = this.state.markers.map((marker, index) => {
        const inputRange = [
          (index - 1) * CARD_WIDTH,
          index * CARD_WIDTH,
          ((index + 1) * CARD_WIDTH),
        ];
        const scale = this.animation.interpolate({
          inputRange,
          outputRange: [1, 1.35, 1],
          extrapolate: "clamp",
        });
        const opacity = this.animation.interpolate({
          inputRange,
          outputRange: [0.35, 1, 0.35],
          extrapolate: "clamp",
        });
        return { scale, opacity };
    });

    const scaleStyle = {
        transform: [
          {
            scale: interpolations[index].scale,
          },
        ],
      };
      const opacityStyle = {
        opacity: interpolations[index].opacity,
      };

      return (
        <MapView.Marker key={index} coordinate={marker.coordinate}>
          <Animated.View style={[markerWrap, opacityStyle, scaleStyle, markerSize]}>
            {this.customMarker()}
          </Animated.View>
        </MapView.Marker>
      );
  }

  onCardClick (person) {
    // capture info for confirmed visit and details in the redux on they book apt, build big info obj
    console.log('marker', person)
  }

  renderCards(marker, index) {
    const { card, cardImage, textContent, cardtitle, cardDescription } = styles;
    
    return (
      <View style={card} key={index}>
          <Image
            source={marker.image}
            style={cardImage}
            resizeMode="cover"
          />
          <View style={textContent}>
            <Text numberOfLines={1} style={cardtitle}>{marker.title}</Text>
            <Text numberOfLines={1} style={cardDescription}>
              {marker.description}
            </Text>
          </View>
          <TouchableOpacity onPress={() => this.onCardClick(marker)}>
            <Text>button</Text>
          </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { container, scrollView, endPadding } = styles;
    const { NU_White } = colors;

    if (!this.state.initialPosition || !this.state.markers) return (
      <FullCard>
        <Spinner />
      </FullCard>
    );

    return (
      <View style={container}>

        <MapView
          provider={PROVIDER_GOOGLE}
          ref={map => this.map = map}
          initialRegion={this.state.initialPosition}
          style={container}
        >
        
          { this.state.markers.map(this.renderMarkers) }

          {/*below is an optional your location marker*/}
          <MapView.Marker coordinate={this.state.initialPosition} pinColor={NU_White}/>
        
        </MapView>
  
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={true}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={scrollView}
          contentContainerStyle={endPadding}
        >

          { this.state.markers.map(this.renderCards) }

        </Animated.ScrollView>

      </View>
    );
  }
}

export default connect(
  state => ({
    regionObj: state.location.locationServices.regionObj,
  }),
  {
    setCurrentLocation,
    getActiveNailTechs,
    getinitialDelta
  }
)(Maptab);

const { NU_Red, NU_White, NU_Transparent, NU_Background, NU_Card_Border, NU_Text_Desc } = colors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: NU_Background,
    marginHorizontal: 10,
    shadowColor: NU_Card_Border,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
    borderRadius: 5 
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: NU_Text_Desc,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  customMarkerShell: {
    width: 40,
    height: 30,
    display: 'flex',
    flexDirection: 'column',
  },
  customMarker: {
    flex: 2,
    backgroundColor: NU_Red,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  customMarkerTailShell: {
    flex: 1,
    backgroundColor: NU_Transparent,
    alignItems: 'center'
  },
  customMarkerTail: {
    width: 0,
    height: 0,
    backgroundColor: NU_Transparent,
    borderStyle: 'solid',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 11,
    borderLeftColor: NU_Transparent,
    borderRightColor: NU_Transparent,
    borderBottomColor: NU_Red,
    transform: [
        {rotate: '180deg'}
      ]
  },
  customMarkerText: {
    color: NU_White,
    fontSize: 11,
  },
  markerSize: {
    width: 100,
    height: 40
  }
});
