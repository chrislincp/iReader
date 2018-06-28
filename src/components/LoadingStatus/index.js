import React from 'react';
import { View } from 'react-native';
import Text from '../Text';
import  Indicator from '../Indicator';
import { AppColors } from '../../themes';

const LoadingStatus = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Indicator size="medium" color={AppColors.themeColor} />
    <Text style={{ marginTop: 16, color: '#D1D1D6' }}>努力加载中...</Text>
  </View>
);

export default LoadingStatus;
