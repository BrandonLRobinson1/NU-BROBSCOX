import React from 'react';
import { View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class MapTab extends React.Component {
    state = {
        latitude: 20.9948891,
        longitude: 105.799677,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002
    }
    
    render() {
        return (
            <View style={styles.container}>
                <MapView provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={this.state}>
                    <MapView.Marker coordinate={this.state} />
                </MapView>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute'
    },
    text: {
        fontSize: 30,
        fontWeight: '700',
        color: '#59656C',
        marginBottom: 10,
    }
};