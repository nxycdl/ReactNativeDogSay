/**
 * Created by dl on 2017-04-11.
 */

import queryString from 'query-string';
import _ from 'lodash';
import config from './config';
import Mock from 'mockjs';

let request = {}

request.get = function (url, path, params) {
    url = (url || config.serviceUrl) + path;
    if (params) {
        url += '?' + queryString.stringify(params);
    }
    console.log(url);
    return fetch(url)
        .then((response) => response.json())
        .then((response) => Mock.mock(response))
        .catch((error) => {
            throw error
        });
}

request.postJson = function (url, path, body) {
    url = (url || config.serviceUrl) + path;
    console.log(url);
    var options = _.extend(config.jsonHeader, {body: JSON.stringify(body)});
    return fetch(url, options).then((response) => response.json())
        .then((response) => Mock.mock(response));
}

request.postForm= function (url, path, body) {
    url = (url || config.serviceUrl) + path;
    console.log(url);
    let formData = new FormData();
    for(var key in body){
        formData.append(key,body[key]);
    }
    var options = _.extend(config.formHeader, {body: formData});
    return fetch(url, options).then((response) => response.json())
        .then((response) => Mock.mock(response));
}

module.exports = request;
