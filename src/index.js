import React from 'react';
import RootStack from './navigator';
import NavigatorService from './navigator/navigatorServer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
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