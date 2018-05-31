import { Dimensions, Linking, PixelRatio, Platform, Toast } from 'react-native';

import DeviceInfo from 'react-native-device-info';

const deviceWidth = Dimensions.get('window').width; // 设备的宽度
const deviceHeight = Dimensions.get('window').height; // 设备的高度
const fontScale = PixelRatio.getFontScale(); // 返回字体大小缩放比例

const pixelRatio = PixelRatio.get(); // 当前设备的像素密度
const defaultPixel = 2; // iphone6的像素密度
// px转换成dp
const w2 = 750 / defaultPixel;
const h2 = 1334 / defaultPixel;
const scale = Math.min(deviceHeight / h2, deviceWidth / w2); // 获取缩放比例

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function isAndroid() {
  return Platform.OS === 'android';
}

export function ifAndroid(androidStyle, iphoneStyle) {
  if (isAndroid()) {
    return androidStyle;
  }
  return iphoneStyle;
}

export function timeCompare(time) {
  const compareTime = new Date(time).getTime();
  const localTime = new Date().getTime();
  const timeDiff = (localTime - compareTime) / 1000;
  let text = '';
  if (timeDiff < 60) {
    text = Math.floor(timeDiff) + '秒';
  } else if ( timeDiff >= 60 && timeDiff < 3600) {
    text = Math.floor(timeDiff / 60) + '分';
  } else if (timeDiff >= 3600 && timeDiff < 86400) {
    text = Math.floor(timeDiff / 3600) + '小时';
  } else if (timeDiff >= 86400 && timeDiff < 2592000) {
    text = Math.floor(timeDiff / 86400) + '天';
  } else if (timeDiff >= 2592000 && timeDiff < 31536000) {
    text = Math.floor(timeDiff / 2592000) + '月';
  } else {
    text = Math.floor(timeDiff / 31536000) + '年';
  }
  return text;
}
