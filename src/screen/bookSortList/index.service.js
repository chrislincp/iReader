import {Get, Post} from '../../utils/http';

export const getBookSort = (opt) => {
  const url = 'http://api.aixuansm.com/book/get_book_list_by_sort';
  return Post(url, opt);
}