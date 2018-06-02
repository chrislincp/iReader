import {Get, Post} from '../../utils/http';

export const getBookDir = (id) => {
  const url = `http://content.aixuansm.com/chapter/dir${id}.html`;
  return Get(url);
}
export const getBookChapter = (bid, cid) => {
  const url = `http://content.aixuansm.com/chapter/b${bid}/c${cid}.html`;
  return Get(url);
}