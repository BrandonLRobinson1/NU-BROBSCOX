import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { colors } from '../../../../Colors';



const SettingsList = ({name, actionLocation, redirect}) => {

  const { row, itemName, icon } = styles;
  return (
    <View style={row}>
      <View style={itemName}>
        <Text>itemName</Text>
      </View>
      <View style={icon} onClick={() => {}/*redirect(actionLocation)*/}>
        <Text>icon</Text>
      </View>
    </View>
  );
};

const { NU_Red , NU_Blue, NU_White, NU_Grey } = colors; // eslint-disable-line

const styles = StyleSheet.create({
  row: {
    flex: 1,
    height: 35,
    fontSize: 14,
    backgroundColor: NU_Grey,
    display: 'flex',
    flexDirection: 'row'
  },
  itemName: {
    flex: 5,
    backgroundColor: NU_Blue,
    justifyContent: 'center',
    paddingLeft: 10
  },
  icon: {
    flex: 1,
    backgroundColor: NU_Red,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 10
  }
});

export default SettingsList;