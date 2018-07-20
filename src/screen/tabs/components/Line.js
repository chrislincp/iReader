import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { AppColors, AppSizes } from '../../../themes';
export default class Line extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const {onPress, icon, title, style, noUnderLine} = this.props;
    return (
      <TouchableOpacity
        style={[{
          flex: 1,
          height: 40,
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: 'white',
          paddingLeft: 10,
        }, style]}
        onPress={() => onPress ? onPress() : {}}
        >
        {icon || null}
        <View style={{
          flex: 1,
          justifyContent: 'center',
          borderColor: AppColors.dividersColor,
          borderBottomWidth: noUnderLine ? 0 : AppSizes.hairLineWidth,
          marginLeft: 10,
        }}>
          <Text>{title || ''}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}