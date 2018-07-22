import React from 'react';
import { BasePage } from '../../components';
import { AppStyles } from '../../themes';
import {
  View,
  ScrollView,
  Text,
} from 'react-native';

export default class MyTopic extends BasePage {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  _render() {
    return (
      <View style={AppStyles.appContainer}>
        <ScrollView>
        </ScrollView>
      </View>
    )
  }
}