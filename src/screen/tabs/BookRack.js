import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { BasePage } from '../../components';
export default class BookRack extends BasePage {
  static navigationOptions = {
    tabBarLabel: '我的书架',
    // tabBarIcon: ({ focused }) => (
    //   <Image
    //     style={{ width: 24, height: 24 }}
    //     source={
    //       focused
    //         ? require('../../images/tabHouseActive.png')
    //         : require('../../images/tabHouseInactive.png')
    //     }
    //   />
    // ),
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  _headerProps() {
    return {
      title: '我的书架',
      left: <View />,
    }
  }

  _render() {
    return (
      <Text>this is BookRack</Text>
    )
  }
}