import {Get, Post} from '../../utils/http';

export const login = (opt) => {
  const url = 'http://line.aixuansm.com/user/user_login';
  return Post(url, opt);
}
export const register = (opt) => {
  const url = 'http://line.aixuansm.com/user/user_register';
  return Post(url, opt);
}

export const getUser = (opt) => {
  const url = 'http://line.aixuansm.com/user/get_user';
  return Post(url, opt);
}


