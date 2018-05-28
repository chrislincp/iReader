import { Platform } from 'react-native';

function lineHeight(fontSize) {
  const multiplier = (fontSize > 20) ? 0.1 : 0.33;
  return parseInt(fontSize + (fontSize * multiplier), 10);
}

const base = {
  size: 14,
  lineHeight: lineHeight(14),
  ...Platform.select({
    ios: {
      family: 'HelveticaNeue',
    },
    android: {
      family: 'Roboto',
    },
  }),
};

export default {
  base: { ...base },
};
