import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { AppColors } from '../../themes';
import Text from '../Text';

export default class Tag extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['primary', 'danger', 'warning', 'success']),
    title: PropTypes.string,
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
    textStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
  }

  static defaultProps = {
    type: 'primary',
    style: {},
    textStyle: {},
    title: '',
  }
  constructor(props) {
    super(props);
    let color;
    switch(props.type) {
      case 'primary':
        color = AppColors.themeColor;
        break;
      case 'danger':
        color = AppColors.danger;
        break;
      case 'warning':
        color = AppColors.warning;
        break;
      case 'success':
        color = AppColors.success;
        break;
      default:
        color = AppColors.themeColor;
        break;
    }
    this.state = {
      color,
    }
  }

  render() {
    const {style, textStyle, title, onPress} = this.props;
    const {color} = this.state;
    return (
      <TouchableOpacity 
        onPress={() => onPress()}
        disabled={!onPress}
        style={[
          styles.tagContent,
          { borderColor: color }, 
          style
        ]}>
        <Text 
          style={[
            styles.tagText, 
            { color }, 
            textStyle
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  tagContent: {
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  tagText: {
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 3,
    paddingBottom: 3,
    fontSize: 11,
  }
});