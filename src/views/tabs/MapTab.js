import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  AppRegistry,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { connect } from 'react-redux';
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import { getUserLocation } from '../../store/location/locationServices';
import  SearchBox  from './SearchBox';
import  SearchResults  from './SearchResults';
import { colors } from '../../Colors';

const Images = [
  { uri: "https://i.imgur.com/sNam9iJ.jpg" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

class Maptab extends Component {
    constructor() {
        super();

        this.state = {
            markers: [
              {
                coordinate: {
                  latitude: 45.524548,
                  longitude: -122.6749817,
                },
                title: "Best Place",
                description: "This is the best place in Portland",
                image: Images[0],
              },
              {
                coordinate: {
                  latitude: 45.524698,
                  longitude: -122.6655507,
                },
                title: "Second Best Place",
                description: "This is the second best place in Portland",
                image: Images[1],
              },
              {
                coordinate: {
                  latitude: 45.5230786,
                  longitude: -122.6701034,
                },
                title: "Third Best Place",
                description: "This is the third best place in Portland",
                image: Images[2],
              },
              {
                coordinate: {
                  latitude: 45.521016,
                  longitude: -122.6561917,
                },
                title: "Fourth Best Place",
                description: "This is the fourth best place in Portland",
                image: Images[3],
              },
            ],
            region: ((this.props || {}).regionObj || {}),
            // region: this.props.regionObj,
            // region: {
            //   latitude: 45.52220671242907,
            //   longitude: -122.6653281029795,
            //   latitudeDelta: 0.04864195044303443,
            //   longitudeDelta: 0.040142817690068,
            // },
          };

        this.renderMarkers =  this.renderMarkers.bind(this);
        this.renderCards =  this.renderCards.bind(this);
        this.onCardClick = this.onCardClick.bind(this);
        this.customMarker = this.customMarker.bind(this);
    }
  
  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);

    // should probaly fire this when you can navigate with the tabs on the bottom (on load)
    this.props.getUserLocation();
  }
  
    componentDidMount() {
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
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
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
      console.log('marker', person)
  }

  renderCards(marker, index) {
    const { card, cardImage, textContent, cardtitle, cardDescription } = styles;
    return (
      <View style={card} key={index} onClick={() => this.onCardClick(marker)}>
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
      </View>
    );
  }

  render() {
    const { container, scrollView, endPadding } = styles;
    // initialRegion={{
    //   latitude: 45.52220671242907,
    //   longitude: -122.6653281029795,
    //   latitudeDelta: 0.04864195044303443,
    //   longitudeDelta: 0.040142817690068,
    // }}

    const loadMap = 
      // this.props.regionObj.longitude // adding .longitude is a BIG problem for andriod sim, also initital region MUST be known on render for driod sim
      this.props.regionObj === false // adding .longitude is a BIG problem for andriod sim, also initital region MUST be known on render for driod sim
        ? (
          <MapView
            provider={PROVIDER_GOOGLE}
            ref={map => this.map = map}
            initialRegion={this.props.regionObj}
            style={container}
          >
          
            { this.state.markers.map(this.renderMarkers) }
          
          </MapView>)
        : (<Text> im not even fuckin TRYING to render a map - bc for andriod i only render once </Text>)


    console.log('???', this.props.regionObj.latitude)
    return (
      <View style={container}>

       {loadMap}
        {/*}
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
        */}
        <SearchBox />
      </View>
    );
  }
}

export default connect(
  state => ({
    regionObj: state.location.locationServices.regionObj,
    // readyToRenderMap: state.location.locationServices.readyToRenderMap,
  }),
  {
    getUserLocation,
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
