import {Get, Post} from '../../utils/http';

export const getMyBookComment = (opt) => {
  const url = 'http://line.aixuansm.com/bookcomment/get_bookcomment_list';
  return Post(url, opt);
}

export const getMyTopic = (opt) => {
  const url = 'http://line.aixuansm.com/topic/get_topic_list';
  return Post(url, opt);
}


export const getMyBookList = (opt) => {
  const url = 'http://line.aixuansm.com/booklist/get_booklist_list';
  return Post(url, opt);
}


export const getMyCollectBookList = (opt) => {
  const url = 'http://line.aixuansm.com/booklist/get_booklist_collect_list';
  return Post(url, opt);
}

export const addFeedback = (opt) => {
  const url = 'http://api.aixuansm.com/book/add_feedback';
  return Post(url, opt);
}


