import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';

const CustomIndicator = Platform.OS === 'ios' ? MaterialIndicator : ActivityIndicator;

export default class Indicator extends Component {
  static propTypes = {
    // 显示
    visible: PropTypes.bool,
    // 指示器颜色
    color: PropTypes.string,
    // 指示器尺寸
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    // 指示器文案
    text: PropTypes.string,
  }

  static defaultProps = {
    visible: true,
    color: '#999',
    size: 'small',
    text: '',
  }


  _renderSpinner() {
    const style = {
      container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        color: '#999',
        backgroundColor: 'transparent',
        fontSize: 14,
        marginLeft: 8,
      },
    };
    let { color, size, text } = this.props;
    switch (size) {
      case 'small':
        size = 20;
        break;
      case 'medium':
        size = 30;
        break;
      case 'large':
        size = 40;
        break;
    }
    return (
      <View style={style.container} >
        <CustomIndicator
          color={color}
          size={size}
        />
        {text ? (<Text style={style.text}>{text}</Text>) : null}
      </View>
    );
  }

  render() {
    if (this.props.visible) {
      return this._renderSpinner();
    }
    return null;
  }
}

