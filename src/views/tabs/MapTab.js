import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import MapView, {PROVIDER_GOOGLE} from "react-native-maps";

//  provider={PROVIDER_GOOGLE}

const Images = [
  { uri: "https://i.imgur.com/sNam9iJ.jpg" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class Maptab extends Component {
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
            region: {
              latitude: 45.52220671242907,
              longitude: -122.6653281029795,
              latitudeDelta: 0.04864195044303443,
              longitudeDelta: 0.040142817690068,
            },
          };

        this.renderMarkers =  this.renderMarkers.bind(this);
        this.renderCards =  this.renderCards.bind(this);
        this.onCardClick = this.onCardClick.bind(this);
        this.customMarker = this.customMarker.bind(this);
    }
  
  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
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
      return (
          <View style={styles.customMarkerShell}>
            <View style={styles.customMarker}>
                <Text style={styles.customMarkerText}> NU </Text>
            </View>
            <View style={styles.customMarkerTailShell}>
                <View style={styles.customMarkerTail}/>
            </View>
          </View>
      )
  }

  renderMarkers(marker, index) {
    // this is the snippet of code that is reponsible for what paticlular marker is zoomed in on
    const interpolations = this.state.markers.map((marker, index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH),
        ];
        const scale = this.animation.interpolate({
            inputRange,
            outputRange: [1, 1.3, 1],
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

      //****** <MapView.Marker pinColor='green'/>*
        // <MapView.Marker key={index} coordinate={marker.coordinate}>
        //      <Animated.View style={[styles.markerWrap, opacityStyle]}>
        //        <Animated.View style={[styles.ring, scaleStyle]} />
        //        <View style={styles.marker} />
        //      </Animated.View>
        //    </MapView.Marker>
      return (
        <MapView.Marker key={index} coordinate={marker.coordinate}>
          <Animated.View style={[styles.markerWrap, opacityStyle, scaleStyle, {width: 100, height: 40}]}>
                <Animated.View style={[scaleStyle ]} />
                {this.customMarker()}
              </Animated.View>
            </MapView.Marker>
      )
  }

  onCardClick (person) {
      console.log('marker', person)
  }

  renderCards(marker, index) {
       return (
        <View style={styles.card} key={index} onClick={this.onCardClick(marker)}>
            <Image
                source={marker.image}
                style={styles.cardImage}
                resizeMode="cover"
            />
            <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.description}
                </Text>
            </View>
        </View>
    )
  }

  render() {

    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.container}
        >
          
          { this.state.markers.map(this.renderMarkers) }
         
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
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
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          { this.state.markers.map(this.renderCards) }
        </Animated.ScrollView>
      </View>
    );
  }
}

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
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
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
    color: "#444",
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
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3
  },
  customMarkerTailShell: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center'
    
  },
  customMarkerTail: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red',
    transform: [
        {rotate: '180deg'}
      ]
  },
  customMarkerText: {
    color: 'white',
    fontSize: 11,
  },
//   marker: {
//     display: 'flex',
//     alignItems: "center",
//     justifyContent: "center",
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "rgba(130,4,150, 0.9)",
//   },
//   ring: {
//     display: 'flex',
//     alignItems: "center",
//     justifyContent: "center",
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     backgroundColor: "rgba(130,4,150, 0.3)",
//     borderWidth: 1,
//     borderColor: "rgba(130,4,150, 0.5)",
//   },

// marker: {
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)",
      },
      ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "relative",
        top: 15,
        borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});

// marker: {
    //     width: 8,
    //     height: 8,
    //     borderRadius: 4,
    //     backgroundColor: "rgba(130,4,150, 0.9)",
    //   },
    //   ring: {
    //     width: 24,
    //     height: 24,
    //     borderRadius: 12,
    //     backgroundColor: "rgba(130,4,150, 0.3)",
    //     position: "absolute",
    //     borderWidth: 1,
    //     borderC


// import React, { Component } from "react";
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Animated,
//   Image,
//   Dimensions,
//   TouchableOpacity,
// } from "react-native";

// import MapView, {PROVIDER_GOOGLE} from "react-native-maps";

// const Images = [
//   { uri: "https://i.imgur.com/sNam9iJ.jpg" },
//   { uri: "https://i.imgur.com/N7rlQYt.jpg" },
//   { uri: "https://i.imgur.com/UDrH0wm.jpg" },
//   { uri: "https://i.imgur.com/Ka8kNST.jpg" }
// ]

// const { width, height } = Dimensions.get("window");

// const CARD_HEIGHT = height / 4;
// const CARD_WIDTH = CARD_HEIGHT - 50;

// export default class Maptab extends Component {
//   state = {
//     markers: [
//       {
//         coordinate: {
//           latitude: 45.524548,
//           longitude: -122.6749817,
//         },
//         title: "Best Place",
//         description: "This is the best place in Portland",
//         image: Images[0],
//       },
//       {
//         coordinate: {
//           latitude: 45.524698,
//           longitude: -122.6655507,
//         },
//         title: "Second Best Place",
//         description: "This is the second best place in Portland",
//         image: Images[1],
//       },
//       {
//         coordinate: {
//           latitude: 45.5230786,
//           longitude: -122.6701034,
//         },
//         title: "Third Best Place",
//         description: "This is the third best place in Portland",
//         image: Images[2],
//       },
//       {
//         coordinate: {
//           latitude: 45.521016,
//           longitude: -122.6561917,
//         },
//         title: "Fourth Best Place",
//         description: "This is the fourth best place in Portland",
//         image: Images[3],
//       },
//     ],
//     region: {
//       latitude: 45.52220671242907,
//       longitude: -122.6653281029795,
//       latitudeDelta: 0.04864195044303443,
//       longitudeDelta: 0.040142817690068,
//     },
//   };

//   componentWillMount() {
//     this.index = 0;
//     this.animation = new Animated.Value(0);
//   }

//   componentDidMount() {
//     // We should detect when scrolling has stopped then animate
//     // We should just debounce the event listener here
//     this.animation.addListener(({ value }) => {
//       let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
//       if (index >= this.state.markers.length) {
//         index = this.state.markers.length - 1;
//       }
//       if (index <= 0) {
//         index = 0;
//       }

//       clearTimeout(this.regionTimeout);
//       this.regionTimeout = setTimeout(() => {
//         if (this.index !== index) {
//           this.index = index;
//           const { coordinate } = this.state.markers[index];
//           this.map.animateToRegion(
//             {
//               ...coordinate,
//               latitudeDelta: this.state.region.latitudeDelta,
//               longitudeDelta: this.state.region.longitudeDelta,
//             },
//             350
//           );
//         }
//       }, 10);
//     });
//   }

//   render() {
//     const interpolations = this.state.markers.map((marker, index) => {
//       const inputRange = [
//         (index - 1) * CARD_WIDTH,
//         index * CARD_WIDTH,
//         ((index + 1) * CARD_WIDTH),
//       ];
//       const scale = this.animation.interpolate({
//         inputRange,
//         outputRange: [1, 2.5, 1],
//         extrapolate: "clamp",
//       });
//       const opacity = this.animation.interpolate({
//         inputRange,
//         outputRange: [0.35, 1, 0.35],
//         extrapolate: "clamp",
//       });
//       return { scale, opacity };
//     });

//     return (
//       <View style={styles.container}>
//         <MapView
//           provider={PROVIDER_GOOGLE}
//           ref={map => this.map = map}
//           initialRegion={this.state.region}
//           style={styles.container}
//         >
//           {this.state.markers.map((marker, index) => {
//             const scaleStyle = {
//               transform: [
//                 {
//                   scale: interpolations[index].scale,
//                 },
//               ],
//             };
//             const opacityStyle = {
//               opacity: interpolations[index].opacity,
//             };
//             return (
//               <MapView.Marker key={index} coordinate={marker.coordinate}>
//                 <Animated.View style={[styles.markerWrap, opacityStyle]}>
//                   <Animated.View style={[styles.ring, scaleStyle]} />
//                   <View style={styles.marker} />
//                 </Animated.View>
//               </MapView.Marker>
//             );
//           })}
//         </MapView>
//         <Animated.ScrollView
//           horizontal
//           scrollEventThrottle={1}
//           showsHorizontalScrollIndicator={false}
//           snapToInterval={CARD_WIDTH}
//           onScroll={Animated.event(
//             [
//               {
//                 nativeEvent: {
//                   contentOffset: {
//                     x: this.animation,
//                   },
//                 },
//               },
//             ],
//             { useNativeDriver: true }
//           )}
//           style={styles.scrollView}
//           contentContainerStyle={styles.endPadding}
//         >
//           {this.state.markers.map((marker, index) => (
//             <View style={styles.card} key={index}>
//               <Image
//                 source={marker.image}
//                 style={styles.cardImage}
//                 resizeMode="cover"
//               />
//               <View style={styles.textContent}>
//                 <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
//                 <Text numberOfLines={1} style={styles.cardDescription}>
//                   {marker.description}
//                 </Text>
//               </View>
//             </View>
//           ))}
//         </Animated.ScrollView>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollView: {
//     position: "absolute",
//     bottom: 30,
//     left: 0,
//     right: 0,
//     paddingVertical: 10,
//   },
//   endPadding: {
//     paddingRight: width - CARD_WIDTH,
//   },
//   card: {
//     padding: 10,
//     elevation: 2,
//     backgroundColor: "#FFF",
//     marginHorizontal: 10,
//     shadowColor: "#000",
//     shadowRadius: 5,
//     shadowOpacity: 0.3,
//     shadowOffset: { x: 2, y: -2 },
//     height: CARD_HEIGHT,
//     width: CARD_WIDTH,
//     overflow: "hidden",
//   },
//   cardImage: {
//     flex: 3,
//     width: "100%",
//     height: "100%",
//     alignSelf: "center",
//   },
//   textContent: {
//     flex: 1,
//   },
//   cardtitle: {
//     fontSize: 12,
//     marginTop: 5,
//     fontWeight: "bold",
//   },
//   cardDescription: {
//     fontSize: 12,
//     color: "#444",
//   },
//   markerWrap: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   marker: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "rgba(130,4,150, 0.9)",
//   },
//   ring: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     backgroundColor: "rgba(130,4,150, 0.3)",
//     position: "absolute",
//     borderWidth: 1,
//     borderColor: "rgba(130,4,150, 0.5)",
//   },
// });




// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

// export default class MapTab extends React.Component {
//     state = {
//         latitude: 37.78825,
//         longitude: -122.4324,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421
//     }
    
//     render() {
//         return (
//             <View style={styles.container}>
//                 <MapView provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={this.state}>
//                     {/*  <MapView.Marker coordinate={this.state} /> */}
//                     <Marker 
//                         coordinate={{
//                             latitude: 37.78825,
//                             longitude: -122.4324
//                         }}>
//                         <View styles={styles.radius}>
//                             <View styles={styles.marker} />
//                         </View>
//                     </Marker>
//                 </MapView>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     radius: {
//         height: 50,
//         width: 50,
//         borderRadius: 50 / 2,
//         overflow: 'hidden',
//         backgroundColor: 'rgba(0, 122, 255, 0.1)',
//         borderWidth: 1,
//         borderColor: 'rgba(0, 112, 255, 0.3)',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     marker: {
//         height: 20,
//         width: 20,
//         borderWidth: 3,
//         borderColor: 'white',
//         borderRadius: 20 / 2,
//         overflow: 'hidden',
//         backgroundColor: '#007AFF'
//     },
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#fff'
//     },
//     map: {
//         left: 0,
//         right: 0,
//         top: 0,
//         bottom: 0,
//         position: 'absolute'
//     },
//     text: {
//         fontSize: 30,
//         fontWeight: '700',
//         color: '#59656C',
//         marginBottom: 10,
//     }
// });