import React from 'react';
import {
  View,
  Text
} from 'react-native';
import RootStack from './navigator';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    console.disableYellowBox = true;
    return (
      <RootStack />
    )
  }
}