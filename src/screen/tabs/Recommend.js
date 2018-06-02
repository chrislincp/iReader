import React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import { DataList, Header, BookItem, BasePage, Icon } from '../../components';
import {getClassic, getRecommend} from './index.service';
import IconName from '../../constants/IconName';
import { AppColors } from '../../themes';

export default class Recommend extends BasePage {
  static navigationOptions = {
    tabBarLabel: '推荐',
    tabBarIcon: ({ focused }) => (
      <Icon name={IconName.ribbon} size={24} color={focused ? AppColors.themeColor : AppColors.textTabInitColor} />
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      screenState: 'loading',
      hotList: [],
      commendList: [],
    };
  }

  componentDidMount() {
    Promise.all([
      getClassic({sex: 1}),
      getRecommend({sex: 1})
    ]).then(res => {
      console.log('recommend res', res);
      if (res[0].success == 1) {
        this.setState({
          hotList: res[0].booklist,
        })
      }
      if (res[1].success == 1) {
        this.setState({
          commendList: res[1].booklist
        })
      }
      this.setState({
        screenState: 'success'
      })
    }).catch(err => {
      this.setState({
        screenState: 'error'
      })
    })
  }

  _headerProps() {
    return {
      title: '精选',
      left: <View />,
    }
  }


  _renderItem = item => <BookItem item={item} onPress={id => this.goDetail(id)} />

  goDetail(id) {
    this.nav.push('BookDetail', {id});
  }

  _render() {
    const {hotList, commendList} = this.state;
    return (
      <ScrollView style={{backgroundColor: AppColors.backgroundColor, flex: 1}}>
        <View style={{ backgroundColor: 'white'}}>
          <View style={{height: 100, borderColor: AppColors.dividersColor, borderBottomWidth: StyleSheet.hairlineWidth}} />
          <View 
            style={{
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              borderLeftWidth: 4, 
              borderColor: AppColors.themeColor, 
              height: 24,
              margin: 10,
              marginBottom: 10,
              }}>
              <Text style={{alignSelf: 'center', marginLeft: 10}}>畅销精选</Text>
            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{alignSelf: 'center', marginRight: 5, color: AppColors.textGreyColor}}>更多</Text>
              <Icon name={IconName.rightArrow} color={AppColors.textGreyColor} size={20} />
            </TouchableOpacity>
          </View>
          {hotList.map(item => <BookItem key={item.bookid} item={item} onPress={() => this.goDetail(item.bookid)} />)}
          <View 
            style={{
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              borderLeftWidth: 4, 
              borderColor: AppColors.themeColor, 
              height: 24,
              margin: 10,
              marginBottom: 0,
              }}>
              <Text style={{alignSelf: 'center', marginLeft: 10}}>主编力荐</Text>
            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{alignSelf: 'center', marginRight: 5, color: AppColors.textGreyColor}}>更多</Text>
              <Icon name={IconName.rightArrow} color={AppColors.textGreyColor} size={20} />
            </TouchableOpacity>
          </View>
          {commendList.map(item => <BookItem key={item.bookid} item={item} onPress={() => this.goDetail(item.bookid)} />)}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({

})