import {Get, Post} from '../../utils/http';

export const getTopList = (opt) => {
  const url = 'http://api.aixuansm.com/book/get_book_top_list';
  return Post(url, opt);
}
export const getOtherList = (opt) => {
  const url = 'http://api.aixuansm.com/book/get_book_top_other_list';
  return Post(url, opt);
}

