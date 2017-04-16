/**
 Created by Administrator on 2017-04-16.
 */
import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native'
import request from '../util/request';
import md5 from 'md5';
import { toastShort } from '../util/ToastUtil';
const USERINFO = 'userInfo';

export default class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            isLoging: false,
            username: '',
            userpassword: ''
        });
    }

    componentDidMount() {
        this._isLogin();
    }

    _isLogin() {
        storage.load({
            key: 'userInfo'
        }).then(ret => {
            console.log('ret', ret)
        }).catch(err => {
            console.log('err', err)
        })
    }


    /*登陆*/
    _onLoging() {
        console.log('_onLoging');
        /*if (isLoging) {
         return;
         }*/
        this.setState({isLoging: true});
        var params = {
            username: this.state.username,
            userpassword: md5(this.state.userpassword.toString()).toUpperCase(),
            usertype: '0',
            openid: '123'
        }
        request.postForm('', '/htgl/app/winxinlogininclassapp.do', params)
            .then((response) => {
                if (response.err != '0') {
                    toastShort(response.err);
                } else {
                    var userinfo = response.data[0];
                    var msg1 = response.msg1;
                    userinfo.msg1 = msg1;
                    userinfo.tel = "13895652926";
                    toastShort('登陆成功！');
                    storage.save({
                        key: USERINFO,
                        rawData: userinfo,
                        expires: 1000 * 3600 * 24 * 7
                    });

                    // 读取
                    storage.load({
                        key: USERINFO,
                        autoSync: true,
                        syncInBackground: true,
                        syncParams: {
                            extraFetchOptions: {},
                            someFlag: true,
                        },
                    }).then(ret => {
                        console.log(ret.msg1);
                        this.setState({user: ret});
                    }).catch(err => {
                        console.warn(err.message);
                        switch (err.name) {
                            case 'NotFoundError':
                                break;
                            case 'ExpiredError':
                                break;
                        }
                    })
                }
            }).catch((error) => {
            console.warn(error);
            /*Toast.show.bind(null, error);*/
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headtitle}>添加账号</Text>
                </View>
                <View style={styles.marginTopview}/>
                <View style={styles.inputview}>
                    <TextInput underlineColorAndroid='transparent'
                               style={styles.textinput}
                               placeholder='QQ号/手机号/邮箱'
                               onChangeText={(text) => this.setState({username: text})}/>
                    <View style={styles.dividerview}>
                        <Text style={styles.divider}></Text>
                    </View>
                    <TextInput underlineColorAndroid='transparent' style={styles.textinput} placeholder='密码'
                               secureTextEntry={true} onChangeText={(text) => this.setState({userpassword: text})}/>
                </View>
                <View style={styles.bottomview}>
                    <TouchableOpacity onPress={this._onLoging.bind(this)}>
                        <View style={styles.buttonview}>
                            <Text style={styles.logintext}>登 录</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.bottombtnsview}>
                        <View style={styles.bottomleftbtnview}>
                            <Text style={styles.bottombtn}>无法登录？</Text>
                        </View>
                        <View style={styles.bottomrightbtnview}>
                            <Text style={styles.bottombtn}>新用户</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    header: {
        height: 50,
        backgroundColor: '#12B7F5',
        justifyContent: 'center',
    },
    headtitle: {
        alignSelf: 'center',
        fontSize: 20,
        color: '#ffffff',
    },
    avatarview: {
        height: 150,
        backgroundColor: '#ECEDF1',
        justifyContent: 'center',
    },
    avatarimage: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    marginTopview: {
        height: 15,
        backgroundColor: '#F7F7F9'
    },
    inputview: {
        height: 100,
    },
    textinput: {
        flex: 1,
        fontSize: 16,
    },
    dividerview: {
        flexDirection: 'row',
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#ECEDF1'
    },
    bottomview: {
        backgroundColor: '#ECEDF1',
        flex: 1,
    },
    buttonview: {
        backgroundColor: '#1DBAF1',
        margin: 10,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logintext: {
        fontSize: 17,
        color: '#FFFFFF',
        marginTop: 10,
        marginBottom: 10,
    },
    emptyview: {
        flex: 1,
    },
    bottombtnsview: {
        flexDirection: 'row',
    },
    bottomleftbtnview: {
        flex: 1,
        height: 50,
        paddingLeft: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    bottomrightbtnview: {
        flex: 1,
        height: 50,
        paddingRight: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    bottombtn: {
        fontSize: 15,
        color: '#1DBAF1',
    }
});