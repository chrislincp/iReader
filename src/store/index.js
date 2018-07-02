import { action, observable, toJS } from 'mobx';
import DeviceStorage from '../utils/deviceStorage';

class Store {

  @observable
  common = {
    sex: null,
  }

  @action.bound
  setCommon = (key, val) => {
    console.log('set common', key, val)
    this.common[key] = val;
    if (key == 'sex') DeviceStorage.save('sex', val);
  }

}
export default new Store();