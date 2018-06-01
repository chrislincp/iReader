import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { AppColors } from '../../themes';

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
    // console.log(props.type, color);
    this.state = {
      color,
    }
  }

  render() {
    const {style, textStyle, title} = this.props;
    const {color} = this.state;
    return (
      <View 
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
      </View>
    )
  }
}
const styles = StyleSheet.create({
  tagContent: {
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    // borderColor: '#e5e5e5',
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
    // color: '#969FA9',
  },
});