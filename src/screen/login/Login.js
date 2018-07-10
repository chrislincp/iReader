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
import { login, getUser } from './index.service';
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
      left: <Icon 
        name={IconName.close} 
        textStyle={{fontSize: 14, marginLeft: 0,}}
        iconStyle={{ paddingLeft: 10, paddingRight: 10 }}
        size={40}
        onPress={() => this.nav.goBack(null)}
      />,
      title: '登录'
    }
  }

  componentDidMount() {
    this.registerEmit = DeviceEventEmitter.addListener('register', options => {
      this.setState({ options });
      setTimeout(() => {
        this.login();
      });
    })
  }

  componentWillUnmount() {
    this.registerEmit.remove();
  }

  onChangeText(key, val) {
    let {options} = this.state;
    options[key] = val;
    this.setState({ options })
  }

  login() {
    Toast.showLoading('登录中');
    Keyboard.dismiss();
    const {options} = this.state;
    console.log(options);
    const params = {
      username: options.user,
      password: options.pwd,
    }
    login(params).then(res => {
      if (res.success == 1) {
        getUser({userkey: res.userkey}).then(result => {
          if (result.success == 1) {
            Toast.hide();
            let userInfo = result.userinfo
            userInfo.userkey = res.userkey;
            store.setUserInfo(userInfo);
            DeviceEventEmitter.emit('login');
            this.nav.goBack(null);
          }
        })
      } else {
        Toast.show(res.msg);
      }
    }).catch(err => {
      console.log(err);
      Toast.show('登录失败');
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
            onSubmitEditing={() => this.login()}
            returnKeyType="done"
            />
          <Icon 
            name={showPwd ? IconName.eye : IconName.eyeOff} size={20} style={{padding: 10}} 
            onPress={() => this.setState({ showPwd: !this.state.showPwd })}
            />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <TouchableOpacity style={{padding: 15}} onPress={() => this.nav.push('Register')}>
            <Text style={{color: AppColors.themeColor}}>注册账号</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.login}
          onPress={() => this.login()}
          disabled={disabled}
          >
          <Text style={{color: disabled ? AppColors.lightGray : 'white'}}>登录</Text>
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