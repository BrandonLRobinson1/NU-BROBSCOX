import React from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, StyleSheet} from 'react-native';


const SettingsList = ({name, actionLocation}) => {

  const { row, itemName, icon } = styles;
  return (
    <View style={row}>
      <View style={itemName}>
        <Text>itemName</Text>
      </View>
      <View style={icon}>
        <Text>icon</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    height: 30,
    fontSize: 14,
    backgroundColor: 'green',
    display: 'flex',
    flexDirection: 'row'
  },
  itemName: {
    flex: 5,
    backgroundColor: 'blue',
    justifyContent: 'center',
    paddingLeft: 10
  },
  icon: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default SettingsList;