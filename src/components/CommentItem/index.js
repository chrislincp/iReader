import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { Text, Icon } from '..';
import { AppColors, AppStyles } from '../../themes';
import { timeCompare } from '../../utils/utils';
import IconName from '../../constants/IconName';

export default class BookItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {item} = this.props;
    return (
      <TouchableOpacity 
        onPress={() => this.props.onPress()}
        style={{
          flexDirection: 'row', 
          justifyContent: 'center', 
          padding: 10,
          borderColor: AppColors.dividersColor, 
          borderBottomWidth: StyleSheet.hairlineWidth,
          backgroundColor: 'white'
          }}>
          <View style={{ marginRight: 5}}>
            <Image style={AppStyles.avatar} source={{uri: item.userimage}} />
          </View>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 12}}>{item.nickname}</Text>
              <Text style={AppStyles.smallText}>{`${timeCompare(item.posttime)}前更新`}</Text>
            </View>
            <Text style={{fontSize: 16, lineHeight: 20}}>{item.title}</Text>
            <Text style={AppStyles.smallText}>{item.content}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Icon name={IconName.mdThumbsUp} color={AppColors.themeColor} size={16} text={`${item.flowercount + item.eggcount}`} />
              </View>
            <View>
              <Icon name={IconName.text} size={16} text={`${item.replycount}`}/>
            </View>
           </View>
        </View>
      </TouchableOpacity>
    )
  }
}
