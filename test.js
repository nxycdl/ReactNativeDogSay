/**
 * Created by Administrator on 2017-04-10.
 */
var _ = require('lodash');
var list = [{uri: '11112'},{uri: '11113'},{uri: '11114'}];
var source = {uri: '1111'};
list.push(source);
console.log(list);
var i = _.remove(list,source);
console.log('x',i);
console.log(list);