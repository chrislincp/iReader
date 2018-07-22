import { action, observable, toJS } from 'mobx';
import DeviceStorage from '../utils/deviceStorage';

class Store {

  @observable
  common = {
    sex: null,
  }

  @observable
  userInfo = {
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

  @action.bound
  setCommon = (key, val) => {
    console.log('set common', key, val)
    this.common[key] = val;
    if (key == 'sex') DeviceStorage.save('sex', val);
  }

  @action.bound
  setUserInfo = (val) => {
    console.log('set userInfo', val)
    this.userInfo = val;
    DeviceStorage.save('userInfo', val);
  }

}
export default new Store();