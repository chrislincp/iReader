import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { BasePage, Icon } from '../../components';
import IconName from '../../constants/IconName';
import { AppColors } from '../../themes';
export default class BookRack extends BasePage {
  static navigationOptions = {
    tabBarLabel: '书架',
    tabBarIcon: ({ focused }) => (
      <Icon name={IconName.book} size={24} color={focused ? AppColors.themeColor : AppColors.textTabInitColor}/>
    ),
  };
  constructor(props) {
    super(props);
    this.state = {};
  }


  _headerProps() {
    return {
      title: '书架',
      left: <View />,
    }
  }

  _render() {
    return (
      <Text>this is BookRack</Text>
    )
  }
}