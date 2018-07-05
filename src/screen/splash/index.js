import React from 'react';
import {
  Image,
  View
} from 'react-native';
import { AppSizes } from '../../themes';
import { getSex } from '../../utils/utils';
import store from '../../store';
import DeviceStorage from '../../utils/deviceStorage';
import { BasePage } from '../../components';
export default class Splash extends BasePage {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  _renderHeader() {
    return null;
  }

  componentDidMount() {
    getSex().then(sex => {
      store.setCommon('sex', sex);
      DeviceStorage.get('userInfo').then(res => {
        if (res) store.setUserInfo(res)
        this.nav.replace('Tab')
      })
    })
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Image 
          source={require('../../images/splash.png')} 
          style={{width: AppSizes.screenWidth, height: AppSizes.screenHeight}}
        />
      </View>
    )
  }
}