/**
 * 先用这个icon最后会替换成我们自己生成的,先在constants/IconName下声明，方便以后替换
 * https://ionicframework.com/docs/ionicons/
 */
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { AppColors, AppStyles } from '../../themes';
import Text from '../Text';

const Icons = ({
  name, size, color, style, iconStyle, onPress, text, textStyle
}) => (
  <TouchableOpacity style={[{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}, style]} onPress={onPress} disabled={typeof onPress !== 'function'}>
    <Icon 
      name={name} 
      size={size} 
      color={color} 
      style={[
        text && {marginTop: 3}, 
        iconStyle
      ]} 
      />
    {text && <Text style={[AppStyles.smallText, {marginLeft: 5}, textStyle]}>{text}</Text>}
  </TouchableOpacity>
);

Icons.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array,
  ]),
  iconStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array,
  ]),
  onPress: PropTypes.func,
};

Icons.defaultProps = {
  size: 14,
  color: '#111111',
  style: {},
  iconStyle: {},
  onPress: null,
};

export default Icons;