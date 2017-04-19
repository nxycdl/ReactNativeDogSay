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
import NavBar from '../component/NavBar'
import Wrapper from '../component/Wrapper';


export default class ChangePwdPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCommit: false,
            username: '',
            oldpassword: '',
            newpasswordfirst: '',
            newpasswordsecond: ''
        };
    }

    componentDidMount() {

    }


    //登陆成功;
    __onchangePwdSuccess() {
        console.log('success');
        this.props.navigator.replace({
            component: Wrapper,
            args: {currentTab: 'My'}
        });
    }

    //修改密码;
    _onchangePwd() {
        let err = '';
        if (_.isEmpty(this.state.oldpassword)) {
            err = '旧密码不能为空'
        }
        if (_.isEmpty(this.state.newpasswordfirst)) {
            err = '新密码不能为空'
        }
        if (this.state.newpasswordfirst != this.state.newpasswordsecond) {
            err = '两次输入的密码不一样';
        }
        if (err) {
            toastShort(err);
            return;
        }
        let params = {
            oldpwd: md5(this.state.oldpassword.toString()).toUpperCase(),
            newpwd: md5(this.state.newpasswordsecond.toString()).toUpperCase(),
            accessToken: global.userInfo.accessToken
        }
        console.log(params);
        this.setState({isCommit: true});
        request.postJson('http://rapapi.org/mockjs/16792/', 'api/changepwd', params)
            .then((response) => {
                let error = response.error;
                if (response.success == true) {
                    error = '密码修改成功！';
                }
                //清除浮层;
                this.setState({isCommit: false}, () => {
                    toastShort(error, () => {
                    });
                });
                if (response.success == false) {
                    return;
                }
                /*跳转到首页*/
                this.__onchangePwdSuccess();
            }).catch((error) => {
            this.setState({isCommit: false});
            console.warn(error);
            /*Toast.show.bind(null, error);*/
        })
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


    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.isCommit == true ? <LoadingCircle/> : null
                }

                <NavBar
                    title="修改密码"
                    leftIcon="ios-arrow-back"
                    leftPress={() => {
                        this.props.navigator.pop()
                    }}
                />
                <View style={styles.marginTopview}/>
                <View style={styles.inputview}>
                    <TextInput underlineColorAndroid='transparent' style={styles.textinput} placeholder='请输入您的旧密码'
                               secureTextEntry={true} onChangeText={(text) => this.setState({oldpassword: text})}/>
                    <View style={styles.dividerview}>
                        <Text style={styles.divider}></Text>
                    </View>
                    <TextInput underlineColorAndroid='transparent' style={styles.textinput} placeholder='请输入您的新密码'
                               secureTextEntry={true} onChangeText={(text) => this.setState({newpasswordfirst: text})}/>
                    <View style={styles.dividerview}>
                        <Text style={styles.divider}></Text>
                    </View>
                    <TextInput underlineColorAndroid='transparent' style={styles.textinput} placeholder='请再次输入您的新密码'
                               secureTextEntry={true}
                               onChangeText={(text) => this.setState({newpasswordsecond: text})}/>
                    <View style={styles.dividerview}>
                        <Text style={styles.divider}></Text>
                    </View>
                </View>
                <View style={styles.bottomview}>
                    <TouchableOpacity onPress={this._onchangePwd.bind(this)}>
                        <View style={styles.buttonview}>
                            <Text style={styles.logintext}>确定</Text>
                        </View>
                    </TouchableOpacity>

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
        height: 120,
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