import { Dimensions, Platform, StyleSheet } from 'react-native';
import { ifIphoneX } from '../utils/utils';

const { width, height } = Dimensions.get('window');
const screenHeight = width < height ? height : width;
const screenWidth = width < height ? width : height;

export default {
  screenHeight,
  screenWidth,
  headerHeight: ifIphoneX(88, 64),
  hairLineWidth: StyleSheet.hairlineWidth,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  statusBarHeight: (Platform.OS === 'ios') ? 16 : 0,
  taBarHeight: 49,
  cardHeadHeight: 44,
  padding: 20,
  paddingSml: 10,
  borderRadius: 2,
};
