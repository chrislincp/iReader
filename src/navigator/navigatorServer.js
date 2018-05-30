import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(NavigationActions.navigate({
    type: NavigationActions.NAVIGATE,
    routeName,
    params,
  }));
}

function goBack() {
  _navigator.dispatch(NavigationActions.back({
    // key: 'Profile',
  }));
}


export default {
  goBack,
  navigate,
  setTopLevelNavigator,
};
