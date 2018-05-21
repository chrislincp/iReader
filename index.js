import { AppRegistry, Platform, UIManager } from 'react-native';
import App from './src/index';

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    error: () => {},
  };
}
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}
AppRegistry.registerComponent('iReader', () => App);
