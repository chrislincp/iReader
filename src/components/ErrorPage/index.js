import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { AppColors } from '../../themes';
// import { ifAndroid } from '../util/Utils';
// import { ifIphoneX } from '../../utils/utils';

export default class ErrorPage extends React.Component {
    static propTypes = {
      title: PropTypes.string,
      buttonText: PropTypes.string,
      onPress: PropTypes.func,
      source: PropTypes.number,
      noButton: PropTypes.bool,
    }

    static defaultProps = {
      title: '',
      buttonText: '轻点刷新',
      source: 0,
      onPress: () => {},
      noButton: false,
    }

    constructor(props) {
      super(props);
      this.state = {};
    }
    render() {
      const {
        source, title, onPress, buttonText, noButton,
      } = this.props;
      return (
        <View style={{
            marginTop: 140,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
        }}
        >
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image style={{ width: 118, height: 118 }} source={source} />
            <Text style={{
              textAlign: 'center',
              color: AppColors.themeColor,
              fontSize: 13,
              lineHeight: 18,
            }}
            >
              {title}
            </Text>
            {!noButton ?
              <TouchableOpacity
                style={{
                borderColor: AppColors.themeColor,
                borderWidth: 1,
                borderRadius: 2,
                width: 100,
                height: 28,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 12,
              }}
                onPress={() => onPress()}
              >
                <Text style={{ fontSize: 13, color: AppColors.themeColor }}>{buttonText}</Text>
              </TouchableOpacity>
            : null}
          </View>
        </View>
      );
    }
}
