import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  DeviceEventEmitter,
  RefreshControl,
} from 'react-native';
import { Text, BasePage, Icon } from '../../components';
import {getTopList, getOtherList, getBookDetail, getOtherName} from './index.service';
import IconName from '../../constants/IconName';
import { AppColors, AppStyles } from '../../themes';

export default class Top extends BasePage {
  static navigationOptions = {
    tabBarLabel: '排行榜',
    tabBarIcon: ({ focused }) => (
      <Icon name={focused ? IconName.stats : IconName.statsOutline} size={24} color={AppColors.themeColor} />
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      screenState: 'loading',
      topTypes: [
        {title: '最热榜', order: 2, icon: 'flame', color: AppColors.danger},
        {title: '评分榜', order: 1, icon: 'rose', color: AppColors.themeColor},
        {title: '推荐榜', order: 5, icon: 'mdThumbsUp', color: AppColors.warning},
        {title: '完结榜', order: 4, icon: 'mdLeaf', color: AppColors.success},
      ],
      otherTop: [],
      refreshing: false,
      loadMore: false,
    };
  }

  componentDidMount() {
    this.getTopList();
    this.emit = DeviceEventEmitter.addListener('sexChange', () => this.getTopList());
  }

  componentWillUnmount() {
    this.emit.remove();
  }

  getTopList() {
    getOtherName().then(res => {
      this.setState({
        otherTop: res.toplist,
        screenState: 'success',
        refreshing: false,
      })
    }).catch(err => {
      this.setState({
        screenState: 'success',
        refreshing: false,
      })
    })
  }

  toggleMore() {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      loadMore: !this.state.loadMore,
    })
  }

  _headerProps() {
    return {
      title: '排行榜',
      left: <View />,
    }
  }

  _render() {
    const {topTypes, otherTop, loadMore} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: AppColors.backgroundColor}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.getTopList()}
             />
            }
        >
          {topTypes.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: 'row', 
                alignItems: 'center',
                height: 48,
                borderColor: AppColors.dividersColor,
                borderBottomWidth: StyleSheet.hairlineWidth,
                backgroundColor: 'white',
              }}
              onPress={() => this.nav.push('BookList', {title: item.title, service: getTopList,  options: {order: item.order}})}
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
          <TouchableOpacity
            style={{
              flexDirection: 'row', 
              alignItems: 'center',
              height: 48,
              backgroundColor: 'white',
              borderColor: AppColors.dividersColor,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
            onPress={() => this.toggleMore()}
            >
            <View 
              style={{
                width: 30, 
                height: 30, 
                borderRadius: 15, 
                backgroundColor: AppColors.lightBlue, 
                marginLeft: 10, 
                marginRight: 10,
                justifyContent: 'center',
              }}>
              <Icon name={IconName.more} color="white" size={16} />
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginRight: 10}}>
              <Text>更多排行</Text>
              <Icon name={loadMore ? IconName.topArrow : IconName.downArrow} size={16} />
            </View>
          </TouchableOpacity>
          <View style={[{overflow: 'hidden'}, !loadMore && {height: 0}]}>
            {otherTop.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'row', 
                  alignItems: 'center',
                  height: 48,
                  backgroundColor: 'white',
                  paddingLeft: 50,
                  borderColor: AppColors.dividersColor,
                  borderBottomWidth: otherTop.length == index + 1 ? 0 : StyleSheet.hairlineWidth,
                }}
                onPress={() => this.nav.push('BookList', {title: item.topname, service: getOtherList,  options: {topid: item.topid}})}
                >
                <Text style={AppStyles.smallText}>{item.topname}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    )
  }
}
