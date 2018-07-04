import axios from 'axios';
import qs from 'qs';
import { getSex, convertObject } from './utils';
import Store from '../store';

const httpFactory = method => async (url, params = {}) => {
  // console.log(Store.common.sex, Store.userInfo)
  return new Promise((resove, reject) => {
    const {common, userInfo} = Store;
    let others = {userkey: userInfo.userkey, userid: userInfo.userid, sex: common.sex};
    let type = method == 'Get' ? 'get' : 'post';
    let opts = Object.assign({}, others, params);   
    console.log(url, opts);
    opts = type == 'get' ? opts : qs.stringify(opts);
    axios[type](url, opts).then(res => {
      console.log(res.data);
      resove(res.data);
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}
const Get = httpFactory('Get');
const Post = httpFactory('Post');

export {
  Get,
  Post,
}