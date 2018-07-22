import React from 'react';
import { BasePage, TitleBar } from '../../components';
import { AppStyles, AppSizes, AppColors } from '../../themes';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
import store from '../../store';

export default class Experience extends BasePage {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  _headerProps() {
    return {
      title: '经验等级'
    }
  }

  _render() {
    console.log(store)
    return (
      <View style={AppStyles.appContainer}>
        <ScrollView>
          <View style={[styles.line, {
            justifyContent: 'space-between',
          }]}>
            <Text>{`我当前的等级 LV.${store.userInfo.level}`}</Text>
            <Text style={AppStyles.smallText}>{`${store.userInfo.experience} / ${store.userInfo.maxexperience}`}</Text>
          </View>
          <TitleBar style={{marginTop: 10, backgroundColor: 'white'}} title="等级特权"  right={<View />} />
          <View style={[styles.line, {borderBottomWidth: AppSizes.hairLineWidth, borderColor: AppColors.dividersColor}]}>
            <Text>LV.2   <Text style={[AppStyles.smallText, {fontSize: 14}]}>发布话题 / 书单 / 书评</Text></Text>
          </View>
          <View style={[styles.line, {borderBottomWidth: AppSizes.hairLineWidth, borderColor: AppColors.dividersColor}]}>
            <Text>LV.3   <Text style={[AppStyles.smallText, {fontSize: 14}]}>修改头像</Text></Text>
          </View>
          <View style={[styles.line]}>
            <Text>LV.N   <Text style={[AppStyles.smallText, {fontSize: 14}]}>更多等级特权即将上线</Text></Text>
          </View>

          <TitleBar title="等级说明" style={{backgroundColor: 'white', marginTop: 10}} right={<View />} />

          <View style={{backgroundColor: 'white', padding: 10, borderBottomWidth: AppSizes.hairLineWidth, borderColor: AppColors.dividersColor}}>
            <Text style={{marginBottom: 10}}>什么是经验？</Text>
            <Text style={AppStyles.smallText}>经验值用来标示用户的经验积累，经验值越大，则经验等级越高，代表的资历越老，随着用户经验等级的提升，可获得一定的奖励和特权，同时经验等级也代表您在书友圈有一定的威望</Text>
          </View>
          <View style={{backgroundColor: 'white', padding: 10}}>
            <Text style={{marginBottom: 10}}>如何获得经验值？</Text>
            <Text style={AppStyles.smallText}>我们为用户提供了丰富的获取经验值的方式，目前主要做任务，具体任务可在任务区查看并领取</Text>

          </View>
        </ScrollView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
  }
})

