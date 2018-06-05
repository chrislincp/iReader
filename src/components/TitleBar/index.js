import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native';
import { AppColors, AppSizes } from '../../themes';
import PropTypes from 'prop-types';
import { Icon } from '..';
import IconName from '../../constants/IconName';
export default class TitleBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const {title, onPress, style, contentStyle, right, rightTitle} = this.props;
    const titleComponent = typeof title == 'string' ?
      <View style={{justifyContent: 'center'}}><Text numberOfLines={1} style={styles.title}>{title}</Text></View> : title;
    const rightComponent = right || 
      <View 
        style={{flexDirection: 'row', justifyContent: 'center'}}
        >
        <Text style={{alignSelf: 'center', marginRight: 5, color: AppColors.textGreyColor}}>{rightTitle || '更多'}</Text>
        <Icon name={IconName.rightArrow} color={AppColors.textGreyColor} size={20} />
      </View>;
    return (
      <TouchableOpacity 
        style={[{
          flexDirection: 'row', 
          padding: 10,
          borderBottomWidth: AppSizes.hairLineWidth,
          borderColor: AppColors.dividersColor,
        }, style]}
        onPress={() => onPress()}
        >
        <View
          style={[{
            flex: 1,
            height: 24,
            borderLeftWidth: 4, 
            borderColor: AppColors.themeColor,
            justifyContent: 'space-between',
            flexDirection: 'row'
          }, contentStyle]}
          >
          {titleComponent}
          {rightComponent}
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    marginLeft: 10,
  }
})