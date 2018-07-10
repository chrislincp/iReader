import React from 'react';
import {
  BasePage, Icon, Input, Toast
} from '../../components';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  DeviceEventEmitter,
  Keyboard
} from 'react-native';
import IconName from '../../constants/IconName';
import { AppSizes, AppColors } from '../../themes';
import { getUser, register, login } from './index.service';
import store from '../../store';

export default class Login extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      showPwd: false,
      options: {
        user: '',
        pwd: '',
      }
    }
  }

  _headerProps() {
    return {
      title: '注册'
    }
  }

  onChangeText(key, val) {
    let {options} = this.state;
    options[key] = val;
    this.setState({ options })
  }

  register() {
    Toast.showLoading('请稍后');
    Keyboard.dismiss();
    const {options} = this.state;
    console.log(options);
    const params = {
      username: options.user,
      password: options.pwd,
      email: 'qq@qq.com',
    }
    register(params).then(res => {
      if (res.success == 1) {
        Toast.hide();
        DeviceEventEmitter.emit('register', this.state.options)
        this.nav.goBack();
      } else {
        Toast.show(res.msg);
      }
    }).catch(err => {
      console.log(err);
      Toast.show('注册失败');
    })
  }

  _render() {
    const {showPwd, options} = this.state;
    const disabled = !options.user || !options.pwd;
    return (
      <ScrollView>
        <View 
          style={[styles.inputWrap, {marginTop: 50}]}
            >
          <Input style={styles.input} placeholder="用户名" value={options.user} onChangeText={val => this.onChangeText('user', val)} />
        </View>
        <View style={styles.inputWrap}>
          <Input 
            style={styles.input} 
            placeholder="密码" 
            value={options.pwd} 
            onChangeText={val => this.onChangeText('pwd', val)} 
            secureTextEntry={!showPwd} 
            onSubmitEditing={() => this.register()}
            returnKeyType="done"
            />
          <Icon 
            name={showPwd ? IconName.eye : IconName.eyeOff} size={20} style={{padding: 10}} 
            onPress={() => this.setState({ showPwd: !this.state.showPwd })}
            />
        </View>
        <TouchableOpacity
          style={styles.login}
          onPress={() => this.register()}
          disabled={disabled}
          >
          <Text style={{color: disabled ? AppColors.lightGray : 'white'}}>注册</Text>
          </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  inputWrap: {
    borderBottomWidth: AppSizes.hairLineWidth, 
    borderColor: AppColors.dividersColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  input: {
    height: 40,
    flex: 1,
  },
  login: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    height: 40,
    backgroundColor: AppColors.themeColor,
    borderRadius: 24,
    width: AppSizes.screenWidth * 0.8,
    marginLeft: AppSizes.screenWidth * 0.1,
    marginTop: 30
  }
})