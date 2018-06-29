import React from 'react';
import RootStack from './navigator';
import NavigatorService from './navigator/navigatorServer';
import { getSex } from './utils/utils';
import store from './store';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    getSex().then(sex => {
      store.setCommon('sex', sex);
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