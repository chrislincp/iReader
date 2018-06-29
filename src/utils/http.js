import axios from 'axios';
import qs from 'qs';
import { getSex } from './utils';
import Store from '../store';

const httpFactory = method => async (url, params = {}) => {
  console.log(Store.common.sex)
  return new Promise((resove, reject) => {
    let opts = Object.assign({}, params, {sex: Store.common.sex});
    console.log(url, opts);

    if (method == 'Get') {
      axios.get(url, opts).then(res => {
        console.log(res.data);
        if (res.data.success == 1) {
          resove(res.data);
        }
      }).catch(err => {
        reject(res);
      })
    } else if (method == 'Post') {
      axios.post(url, qs.stringify(opts)).then(res => {
        console.log(res.data);
        if (res.data.success == 1) {
          resove(res.data);
        }
      }).catch(err => {
        console.log(err);
        reject(err);
      })
    }
  })
}
const Get = httpFactory('Get');
const Post = httpFactory('Post');

export {
  Get,
  Post,
}