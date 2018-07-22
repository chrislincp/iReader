import {Get, Post} from '../../utils/http';

export const getCollectList = (opt) => {
  const url = 'http://line.aixuansm.com/booklist/get_booklist_list';
  return Post(url, opt);
}

export const getCollectDetail = (opt) => {
  const url = 'http://line.aixuansm.com/booklist/get_booklist_detail';
  return Post(url, opt);
}
export const checkCollected = (opt) => {
  const url = 'http://line.aixuansm.com/booklist/is_collect_booklist';
  return Post(url, opt);
}
export const collectBooklist = (opt) => {
  const url = 'http://line.aixuansm.com/booklist/collect_booklist';
  return Post(url, opt);
}
export const cancelCollectBooklist = (opt) => {
  const url = 'http://line.aixuansm.com/booklist/collect_booklist_cancel';
  return Post(url, opt);
}
