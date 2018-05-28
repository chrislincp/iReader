import {Get, Post} from '../../utils/http';

export const getBookDetail = (opt) => {
  const url = 'http://api.aixuansm.com/book/get_book_info';
  return Post(url, opt);
}

export const getBookHotComment = (opt) => {
  const url = 'http://line.aixuansm.com/bookcomment/get_hot_bookcomment_list';
  return Post(url, opt);
}

export const getSimiarBook = (opt) => {
  const url = 'http://api.aixuansm.com/book/get_similar_book';
  return Post(url, opt);
}
