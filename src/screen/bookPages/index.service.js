import {Get, Post} from '../../utils/http';

export const getBookDirectory = (bookid) => {
  const url = `http://content.aixuansm.com/chapter/dir${bookid}.html`;
  return Get(url);
}

export const getBookChapter = (bookid, chapterid) => {
  const url = `http://content.aixuansm.com/chapter/b${bookid}/c${chapterid}.html`;
  return Get(url);
}

export const postFeedBack = (opt) => {
  const url = 'http://api.aixuansm.com/chapter/post_chapter_error';
  return Post(url, opt);
}


