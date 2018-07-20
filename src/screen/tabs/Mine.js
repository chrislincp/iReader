import React from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {observer} from 'mobx-react';
import { BasePage, Icon, Text, Tag } from '../../components';
import IconName from '../../constants/IconName';
import { AppColors, AppStyles } from '../../themes';
import Store from '../../store';
import { ifIphoneX } from '../../utils/utils';
import Line from './components/Line';

@observer
export default class BookRack extends BasePage {
  static navigationOptions = {
    tabBarLabel: '我的',
    tabBarIcon: ({ focused }) => (
      <Icon name={focused ? IconName.person : IconName.personOutline} size={24} color={AppColors.themeColor}/>
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          list: [
            { title: '经验等级', icon: IconName.gameController, color: AppColors.lightBlue, path: 'Experience'},
            { title: '任务', icon: IconName.listBox, color: AppColors.danger, path: 'Task'},
          ]
        },
        {
          list: [
            { title: '我的书单', icon: IconName.bookmarks, color: AppColors.warning, path: 'MyBookList'},
            { title: '我的话题', icon: IconName.mdText, color: AppColors.success, path: 'MyTopic'},
            { title: '我的书评', icon: IconName.create, color: AppColors.themeColor, path: 'MyComment'},
          ]
        },
        {
          list: [
            { title: '设置', icon: IconName.configMd, color: AppColors.lightGray, path: 'Config'},
          ]
        }
      ]
    };
  }

  _headerProps() {
    return {
      title: '',
      left: <View />,
    }
  }

  _renderHeader() {
    return null;
  }

  goMyInfo() {
    this.nav.push('MyInfo');
  }


  _render() {
    const {data} = this.state;
    console.log('mine', Store.userInfo.userid)
    return (
      <ScrollView style={AppStyles.appContainer}>
          <TouchableOpacity 
            style={{
              justifyContent: 'center', 
              alignItems: 'center', 
              backgroundColor: 'white', 
              flexDirection: 'row', 
              paddingTop: ifIphoneX(64, 40),
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 15,
              backgroundColor: 'white',
            }}
            disabled={!Store.userInfo.userid}
            onPress={() => Store.userInfo.userid ? this.goMyInfo() : {}}
            >
            <View style={{backgroundColor: AppColors.lightGray, width: 60, height: 60, borderRadius: 30, marginRight: 10}}>
              <Image 
                source={Store.userInfo.userkey ? 
                  {uri: Store.userInfo.image} :
                  require('../../images/user_default_pic.png')} 
                style={{width: 60, height: 60, borderRadius: 30}} 
                />
            </View>
            <View style={{flex: 1, justifyContent: 'center',  padding: 10}}>
              {Store.userInfo.userid ?
              <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{marginRight: 5}}>{Store.userInfo.nickname}</Text>
                  <Tag title={`LV.${Store.userInfo.level}`} type="danger" />
                </View>
                <View style={{flexDirection: 'row', height: 2, width: 200, marginTop: 5, marginBottom: 5}}>
                  <View style={{flex: 1, backgroundColor: AppColors.success}}></View>
                  <View style={{width: 100 * (1 - Store.userInfo.experience / Store.userInfo.maxexperience), backgroundColor: AppColors.darkGray}}></View>
                </View>
                <Text style={{fontSize: 12, color: AppColors.darkGray}}>{`升级经验：${Store.userInfo.experience} / ${Store.userInfo.maxexperience}`}</Text>
              </View> :
              <TouchableOpacity
                onPress={() => this.nav.navigate('LoginStack')}
                >
                <Text style={{color: AppColors.themeColor, fontWeight: 'bold'}}>登录 / 注册</Text>
              </TouchableOpacity>
              }

            </View>
          </TouchableOpacity>
          {Store.userInfo.userid ? data.map((item, index) => (
            <View key={index} style={{marginTop: 15, backgroundColor: 'white'}}>
              {item.list.map((line, i) => (
                <Line 
                  key={i}
                  title={line.title} 
                  noUnderLine={item.list.length - 1 == i} 
                  icon={<Icon name={line.icon} size={20} color={line.color} />} 
                  onPress={() => this.nav.push(line.path)}
                  />
                ))}
            </View>
          )) : null}
      </ScrollView>
    )
  }
}