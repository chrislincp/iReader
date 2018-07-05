import React from 'react';
import RootStack from './navigator';
import NavigatorService from './navigator/navigatorServer';
import SplashScreen from 'react-native-splash-screen';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    SplashScreen.hide();
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