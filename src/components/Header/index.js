import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, StatusBar, Animated, Keyboard } from 'react-native';
import { ifIphoneX, ifAndroid } from '../../utils/utils';
import { withNavigation } from 'react-navigation';
import Icon from '../Icon';
import IconName from '../../constants/IconName';
import Sizes from '../../themes/Sizes';
import NavigatorService from '../../navigator/navigatorServer';
import { AppColors } from '../../themes';

class Header extends Component {
  static propTypes = {}

  static defaultProps = {
    statusBar: 'light-content',
  };

  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      fontColor: 'black',
    };
  }

  render() {
    const {
      navigation, isFocused, statusBar, left, leftPress, title, right, style, leftStyle, rightStyle, centerStyle, backgroundColor,
    } = this.props;

    const leftComponent = left ||
      <Icon
        name={IconName.back}
        size={26}
        text="返回"
        color="white"
        textStyle={{fontSize: 14, color: 'white', marginLeft: 0}}
        iconStyle={{ paddingLeft: 10, paddingRight: 10 }}
        onPress={leftPress || (() => {
          Keyboard.dismiss();
          NavigatorService.goBack();
        })}
      />;

    const centerComponent = typeof this.props.title == 'string' ? <Text numberOfLines={1} style={styles.title}>{title}</Text> : title;

    const rightComponent = right || null;

    return (
      <View style={[styles.container, style]}
      >
        <View style={[styles.left, leftStyle]}>
          {leftComponent}
        </View>
        <View style={[styles.center, centerStyle]}>
          {centerComponent}
        </View>
        <View style={[styles.right, rightStyle]}>
          {rightComponent}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Sizes.screenWidth,
    height: ifIphoneX(88, 64),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: ifAndroid(0, ifIphoneX(44, 20)),
    backgroundColor: AppColors.themeColor,
    zIndex: 1,
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  center: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    color: 'white',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});


export default Header;
