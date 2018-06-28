import React from 'react';
import {
  View,
} from 'react-native';
import { BasePage, Icon, Text } from '../../components';
import IconName from '../../constants/IconName';
import { AppColors } from '../../themes';
export default class BookRack extends BasePage {
  static navigationOptions = {
    tabBarLabel: '我的',
    tabBarIcon: ({ focused }) => (
      <Icon name={focused ? IconName.person : IconName.personOutline} size={24} color={AppColors.themeColor}/>
    ),
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  _headerProps() {
    return {
      title: '我的',
      left: <View />,
    }
  }

  _render() {
    return (
      <Text>我的</Text>
    )
  }
}