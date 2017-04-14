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
    return fetch(url).then((response) => response.json())
        .then((response) => {
            console.log(response);
            Mock.mock(response)
        })
        .catch((error) => {
            console.log('fetch:get:' + error)
        });
}

request.post = function (url, body) {
    url = (url || config.serviceUrl) + path;
    var options = _.extend(config.header, {body: JSON.stringify(body)});
    return fetch(url, options).then((response) => response.json())
        .then((response) => Mock.mock(response));
}

module.exports = request;
