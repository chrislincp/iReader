import axios from 'axios';
import qs from 'qs';

const httpFactory = method => async (url, params = {}) => {
  return new Promise((resove, reject) => {
    if (method == 'Get') {
      axios.get(url, params).then(res => {
        resove(res);
      }).catch(err => {
        reject(res);
      })
    } else if (method == 'Post') {
      axios.post(url, qs.stringify(params)).then(res => {
        resove(res);
      }).catch(err => {
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