import React from 'react';
import RootStack from './navigator';
import NavigatorService from './navigator/navigatorServer';
import { getSex } from './utils/utils';
import store from './store';
import SplashScreen from 'react-native-splash-screen';
import DeviceStorage from './utils/deviceStorage';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    getSex().then(sex => {
      store.setCommon('sex', sex);
      DeviceStorage.get('userInfo').then(res => {
        if (res) store.setUserInfo(res)
        SplashScreen.hide();
      })
    })
  }

  render() {
    console.disableYellowBox = true;
    return (
      <RootStack
        ref={(navigatorRef) => {
          NavigatorService.setTopLevelNavigator(navigatorRef);
        }} 
        />
    )
  }
}