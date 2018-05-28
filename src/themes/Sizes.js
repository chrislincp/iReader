import { Dimensions, Platform, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
const screenHeight = width < height ? height : width;
const screenWidth = width < height ? width : height;

export default {
  screenHeight,
  screenWidth,
  hairLineWidth: StyleSheet.hairlineWidth,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  statusBarHeight: (Platform.OS === 'ios') ? 16 : 0,
  taBarHeight: 49,
  cardHeadHeight: 44,
  padding: 20,
  paddingSml: 10,
  borderRadius: 2,
};
