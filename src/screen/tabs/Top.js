import React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import { DataList, Header, BookItem, BasePage, Icon } from '../../components';
import {getTopList, getBookDetail} from './index.service';
import IconName from '../../constants/IconName';
import { AppColors } from '../../themes';

export default class Top extends BasePage {
  static navigationOptions = {
    tabBarLabel: '排行榜',
    tabBarIcon: ({ focused }) => (
      <Icon name={IconName.stats} size={24} color={focused ? AppColors.themeColor : AppColors.textTabInitColor} />
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      topTypes: [
        {title: '最热榜', order: 2, icon: 'flame', color: AppColors.danger},
        {title: '评分榜', order: 1, icon: 'rose', color: AppColors.themeColor},
        {title: '推荐榜', order: 5, icon: 'mdThumbsUp', color: AppColors.warning},
        {title: '完结榜', order: 4, icon: 'mdLeaf', color: AppColors.success},
      ]
    };
  }

  _headerProps() {
    return {
      title: '排行榜',
      left: <View />,
    }
  }

  _render() {
    const {topTypes} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: AppColors.backgroundColor}}>
        <ScrollView style={{backgroundColor: 'white'}}>
          {topTypes.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: 'row', 
                alignItems: 'center',
                height: 48,
                borderColor: AppColors.dividersColor,
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
              onPress={() => this.nav.push('TopList', item)}
              >
              <View 
                style={{
                  width: 30, 
                  height: 30, 
                  borderRadius: 15, 
                  backgroundColor: item.color, 
                  marginLeft: 10, 
                  marginRight: 10,
                  justifyContent: 'center',
                }}>
                <Icon name={IconName[item.icon]} color="white" size={16} />
              </View>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    )
  }
}
