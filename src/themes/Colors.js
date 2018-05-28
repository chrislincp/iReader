const app = {
  red: '#FF3366',
  blue: '#448AFF',
  yellow: '#FFC800',
  green: '#53F05E',
  white: '#fff',
  ColdGray: '#EFEFF4',
  darkGray: '#D1D1D6',
  lightGray: '#E5E5EA',
  lightBlack: '#474646',
  backgroundColor: '#F7F8FA',
  themeColor: '#a5dee4',
};

// 字体颜色
const text = {
  textThemeColor: '#FF3366',
  textNormalColor: '#111111',
  textSubColor: '#474646',
  textLightColor: '#C7C7CC',
  textGreyColor: '#888',
};

// 分割线颜色
const dividers = {
  dividersColor: '#D8D8D8',
};

// tabBar颜色
const tabBar = {
  tabBar: {
    background: '#ffffff',
    iconDefault: '#8F8E94',
    iconSelected: '#111111',
  },
};

export default {
  ...app,
  ...text,
  ...dividers,
  ...tabBar,
};
