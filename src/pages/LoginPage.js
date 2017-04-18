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
import {toastShort} from '../util/ToastUtil';
import LoadingBar from '../component/LoadingBar'
import LoadingCircle from '../component/LoadingCircle';
import {USERINFO} from '../util/GlobalType'
import RootApp from '../root';


export default class LoginPage extends Component {

    constructor(props) {
        super(props);
        console.log('loginpage', props);
        this.state = {
            isLoging: false,
            username: '',
            userpassword: ''
        };
    }

    componentDidMount() {
        this._isLogin();
    }

    _isLogin() {
        storage.load({
            key: USERINFO
        }).then(ret => {
            console.log('ret', ret)
        }).catch(err => {
            console.log('err', err)
        })
    }

    //登陆成功;
    _onLogingSuccess() {
        console.log('success');
        this.props.afterLogin();
    }

    _onLoging() {
        console.log('_onLoging');
        if (this.state.isLoging) {
            return;
        }
        this.setState({isLoging: true});
        var params = {
            userid: this.state.username,
            password: md5(this.state.userpassword.toString()).toUpperCase(),
        }
        request.postJson('http://rapapi.org/mockjs/16792/', 'api/login', params)
            .then((response) => {
                let error = response.error;
                if (response.success == true) {
                    error = '登陆成功！';
                }
                //清除浮层;
                this.setState({isLoging: false}, () => {
                    toastShort(error, () => {
                    });
                });
                if (response.success == false) {
                    return;
                }

                this.setState({isLoging: false});
                var userinfo = response.result[0];
                console.log(userinfo);
                storage.save({
                    key: USERINFO,
                    rawData: userinfo,
                    expires: 1000 * 3600 * 24 * 7
                });
                global.userInfo = userinfo;
                /*跳转到首页*/
                this._onLogingSuccess();
            }).catch((error) => {
            this.setState({isLoging: false});
            console.warn(error);
            /*Toast.show.bind(null, error);*/
        })

    }


    /*登陆*/
    _onLogingTest() {
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
                this.setState({isLoging: false});
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
            this.setState({isLoging: false});
            console.warn(error);
            /*Toast.show.bind(null, error);*/
        })
    }


    render() {
        return (
            <View style={styles.container}>
                {
                    /*this.state.isLoging == true ? <LoadingBar /> : null*/
                    this.state.isLoging == true ? <LoadingCircle/> : null
                }

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