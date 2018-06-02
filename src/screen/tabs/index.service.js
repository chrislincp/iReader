import {Get, Post} from '../../utils/http';

export const getRecommend = (opt) => {
  const url = 'http://api.aixuansm.com/book/get_commend_book';
  return Post(url, opt);
}
export const getClassic = (opt) => {
  const url = 'http://api.aixuansm.com/book/get_classic_book';
  return Post(url, opt);
}
export const getNewRecommend = (opt) => {
  const url = 'http://api.aixuansm.com/book/get_recently_good_book_list';
  return Post(url, opt);
}
export const getBookDetail = (opt) => {
  const url = 'http://api.aixuansm.com/book/get_book_info';
  return Post(url, opt);
}

export const getTopList = (opt) => {
  const url = 'http://api.aixuansm.com/book/get_book_top_list';
  return Post(url, opt);
}
export const getBookList = (opt) => {
  const url = 'http://line.aixuansm.com/booklist/get_booklist_list';
  return Post(url, opt);
}
