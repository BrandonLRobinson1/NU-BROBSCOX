import React from 'react';
import { View, Text, StyleSheet} from 'react-native';


const SettingsList = ({name, actionLocation, redirect}) => {

  const { row, itemName, icon } = styles;
  return (
    <View style={row}>
      <View style={itemName}>
        <Text>itemName</Text>
      </View>
      <View style={icon} onClick={() => redirect(actionLocation)}>
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