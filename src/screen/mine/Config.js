import React from 'react';
import { BasePage, Icon } from '../../components';
import { AppStyles, AppColors, AppSizes } from '../../themes';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import IconName from '../../constants/IconName';
import store from '../../store';

export default class Config extends BasePage {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  _headerProps() {
    return {
      title: '设置',
    }
  }

  logout() {
    Alert.alert('提示', '确定要退出登录吗', [
      {text: '取消', onPress: () => {}},
      {text: '确定', onPress: () => this.sureLogout()}
    ])
  }

  sureLogout() {
    const userInfo = {
      userkey: '',
      userid: '',
      username: '',
      email: null,
      sex: null,
      image: '',
      nickname: '',
      experience: 0,
      signcount: 0,
      signtime: 0,
      level: 0,
      maxexperience: 0,
    }

    store.setUserInfo(userInfo);
    this.nav.pop();
  }

  _render() {
    return (
      <View style={AppStyles.appContainer}>
        <View>
          <TouchableOpacity style={[styles.line, styles.underline]}>
            <Text>意见反馈</Text>
            <Icon name={IconName.rightArrow} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.line]} onPress={() => this.nav.push('About')}>
            <Text>关于爱阅读</Text>
            <Icon name={IconName.rightArrow} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.line, {marginTop: 20, justifyContent: 'center'}]}
            onPress={() => this.logout()}
            >
            <Icon name={IconName.power} color={AppColors.danger} style={{marginRight: 10}} size={18} />
            <Text style={{color: AppColors.danger, fontSize: 16, fontWeight: 'bold'}}>退出</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  underline: {
    borderBottomWidth: AppSizes.hairLineWidth,
    borderColor: AppColors.dividersColor,
  },
})