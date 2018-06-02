const app = {
  success: '#67C23A',
  warning: '#F7BA2A',
  danger: '#F56C6C',
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
  textTabInitColor: '#B9C4CE',
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
