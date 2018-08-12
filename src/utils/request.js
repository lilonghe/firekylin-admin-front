import fetch from 'dva/fetch';
import FormData  from 'form-data';
import queryString from 'query-string';
import { message } from 'antd';

const baseUrl = "/admin/"

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options={}) {
  options.credentials =  'include';
  if(options.form) {
    if (!options.headers) {
      options.headers = {};
    }
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    // var form = new FormData();
    // Object.keys(options.form).map(k => {
    //   form.append(k, options.form[k]);
    // });
    options.body = queryString.stringify(options.form);
    delete options.form;
  }
  return fetch(baseUrl + url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      if(data.errno) {
        if(typeof data.errmsg==='object') {
          message.error(JSON.stringify(data.errmsg));
        } else {
          message.error(data.errmsg);
        }
      }
      if (data.errno !== 0) {
        data.err = data.errmsg
      }

      if (data.errmsg === 'USER_NOT_LOGIN') {
        window.location.href = '/admin';
      }

      return data;
    })
    .catch(err => ({ err }));
}
