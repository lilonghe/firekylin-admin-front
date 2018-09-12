import request from '../utils/request';

export function login(params) {
  return request('user/login', { form: params, method: 'post' });
}

export function fetchSystemSummary() {
  return request('api/system');
}

export function fetchLastPost() {
  return request('api/post?type=lastest');
}

export function fetchListPost(params) {
  return request('api/post', { query: params });
}

export function fetchListCate() {
  return request('api/cate');
}

export function updateOptions(params) {
  return request('api/options?method=put', { form: params, method: 'post' });
}

export function fetchListTag() {
  return request('api/tag');
}

export function createPost(params) {
  return request('api/post', { form: params, method: 'post' });
}