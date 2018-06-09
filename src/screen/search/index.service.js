import {Get, Post} from '../../utils/http';

export const searchHotKeys = (opt) => {
  const url = 'http://api.aixuansm.com/book/book_search_all';
  return Post(url, opt);
}

export const searchKeyWord = (opt) => {
  const url = 'http://api.aixuansm.com/book/search_book';
  return Post(url, opt);
}