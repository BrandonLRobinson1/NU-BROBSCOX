import React, { Component } from 'react';
import { connect } from 'react-redux';
import FavoriteItem from './FavoriteItem';
import { View, Text, StyleSheet, Dimensions, ScrollView, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, CardSection, FullCard } from '../../../common';
// import { updateFirstName, updateLastName, updateZipCode } from '../../store/signUp/SignUp'; 
import data from '../../../store/dummyMembers.json';
import { colors } from '../../../Colors';


class Favorites extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(data),
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(personData) => <FavoriteItem key={'x'} personData={personData} />}
      />
    );
  }
}

// class Favorites extends Component {
//   // constructor(){
//   //   super();
//   // //   this.state = {
//   // //     errorMessage: ' ',
//   // //     loading: false
//   // //   }

//   //   this.renderFavorites = this.renderFavorites.bind(this);
//   // }

//   componentWillMount() {
//     // listview set up
//     const ds = new ListView.DataSource({
//       rowHasChanged: (r1, r2) => r1 !== r2
//     });
//     this.dataSource = ds.cloneWithRows( [1,2,3] );
//     console.log('diss', this)
//   }

//   renderFavorites = person => <FavoriteItem key={'x'} person={person} />

//   // renderRow () {
//   //   return data.map( album => <FavoriteItem key={'x'} /> );
//   //   // return (<FavoriteItem /> );
//   // }

//   // renderFavorites (fav) { 
//   //   return (
//   //     <FavoriteItem fav={fav} />
//   //   )
//   // }


//   render() {
//     const {  circleContainer } = styles
//     return (
//       <ListView
//         dataSource={this.dataSource}
//         renderFavorites={this.renderFavorites}
//       />
//     )
//   }
// }

export default connect(
  state => ({
    // firstName: state.signUp.SignUp.firstName,
    // lastName: state.signUp.SignUp.lastName,
    // zipCode: state.signUp.SignUp.zipCode
  }),
  {
    // updateFirstName,
    // updateLastName,
    // updateZipCode
  }
)(Favorites);

const { NU_Red , NU_Blue, NU_White, NU_Grey } = colors;

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



// componentWillMount() {
//   // listview set up
//   const ds = new ListView.DataSource({
//     rowHasChanged: (r1, r2) => r1 !== r2
//   });
//   this.dataSource = ds.cloneWithRows(this.props.libraries);
// }

// renderFavorites = (library) => <ListItem library={library} /> //native agrument to pass

// render() {
//   return (
//     <ListView
//       dataSource={this.dataSource}
//       renderFavorites={this.renderFavorites}
//     />
//   )
// }
// }