import {Get, Post} from '../../utils/http';

export const getBookComments = (opt) => {
  const url = 'http://line.aixuansm.com/bookcomment/get_bookcomment_list';
  return Post(url, opt);
}

export const getBookCommentDetail = (opt) => {
  const url = 'http://line.aixuansm.com/bookcomment/get_bookcomment_detail';
  return Post(url, opt);
}

export const getBookCommentReply = (opt) => {
  const url = 'http://line.aixuansm.com/bookcomment/get_bookcomment_reply_list';
  return Post(url, opt);
}