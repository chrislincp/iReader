import { Dimensions, Linking, PixelRatio, Platform, Toast } from 'react-native';

import DeviceInfo from 'react-native-device-info';
import { AppSizes } from '../themes';
import DeviceStorage from './deviceStorage';

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

export function parseDate(date) {
  var isoExp, parts;
  isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s(\d\d):(\d\d):(\d\d)\s*$/;
  try {
      parts = isoExp.exec(date);
  } catch(e) {
      return null;
  }
  if (parts) {
      date = new Date(parts[1], parts[2] - 1, parts[3], parts[4], parts[5], parts[6]);
  } else {
      return null;
  }
  return date;
}

export function timeCompare(time) {
  const compareTime = parseDate(time).getTime();
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

export const formatterChapter = (info) => {
  const width = AppSizes.screenWidth - 20;
  const height = AppSizes.screenHeight - ifIphoneX(40, 10);
  let fontCount = parseInt(width / 14 - 1)
  let fontLines = parseInt((height - 20) / 24);
  const length = info.chaptercontent;
  let arr = [];
  for (var i = 0; i <= fontLines; i++) {
    let str = info.chaptercontent.substring(x, x + fontCount)
    if (str.indexOf('@') != -1) {
      y = x + str.indexOf('@') + 1
      _array[i] = content.substring(x, y).replace('@', '')
      x = y
      continue
    } else {
      y = x + fontCount
      _array[i] = content.substring(x, y)
      x = y
      continue
    }
  }
}

export const joinRack = (book) => {
  return new Promise((resove, reject) => {
    DeviceStorage.get('rackList').then(res => {
      let data = res || [];
      data.push(book);
      DeviceStorage.save('rackList', data).then(() => resove());
    })
  })
}

export const removeRack = (bookid) => {
  return new Promise((resove, reject) => {
    DeviceStorage.get('rackList').then(res => {
      let data = res || [];
      let i;
      data.forEach((item, index) => {
        if (item.bookInfo.bookid == bookid) i = index;
      })
      data.splice(i, 1);
      DeviceStorage.save('rackList', data).then(() => resove());
    })
  })
}

export const checkBookRack = (bookid) => {
  //  检验是否已在书架
  return new Promise((resove, reject) => {
    DeviceStorage.get('rackList').then(res => {
      let exist = false;
      let data = res || [];
      let i;
      data.forEach((item, index) => {
        if (item.bookInfo.bookid == bookid) {
          exist = true;
          i = index;
        }
      })
      const opt = exist ? {exist, data: data[i]} : {exist}
      resove(opt)
    })
  })
}

export const setTopRackBook = bookid => {
  return new Promise((resove, reject) => {
    DeviceStorage.get('rackList').then(res => {
      let data = res || [];
      let index, opt;
      data.forEach((item, i) => {
        console.log(item);
        if (item.bookInfo.bookid == bookid) {
          index = i;
          opt = item;
        }
      })
      data.splice(index, 1);
      data.push(opt);
      DeviceStorage.save('rackList', data).then(() => resove());
    })
  })
}

export const getSex = () => {
  return new Promise((resove, reject) => {
    DeviceStorage.get('sex').then(res => {
      if (res == null) {
        resove(1);
      } else {
        resove(res);
      }
    })
  })
}

export const convertObject = (data) => {
  let obj = {};
  Object.keys(data).forEach(key => {
    if (data[key] == undefined || data[key] == null || data[key] == '') return;
    else obj[key] = data[key];
  })
  return obj;
}


