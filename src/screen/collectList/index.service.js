import {Get, Post} from '../../utils/http';

export const getCollectList = (opt) => {
  const url = 'http://line.aixuansm.com/booklist/get_booklist_list';
  return Post(url, opt);
}

export const getCollectDetail = (opt) => {
  const url = 'http://line.aixuansm.com/booklist/get_booklist_detail';
  return Post(url, opt);
}
