/**
 * Created by Administrator on 2017-04-10.
 */
var _ = require('lodash');
var mobile = "13895652926"
if (mobile.length = 11) {
    mobile = mobile.substr(0, 3) + "****" + mobile.substr(7, 4);
}
console.log(mobile);
