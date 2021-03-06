import React, {Component, PropTypes} from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    Platform,
    ScrollView,
    AlertIOS,
    RefreshControl,
    TouchableHighlight,
    TouchableNativeFeedback
} from 'react-native'
import NavBar from '../component/NavBar';
import Item from '../component/Item';
import Wrapper from '../component/Wrapper';
import {USERINFO} from '../util/GlobalType';
import ChangePwdPage from '../pages/ChangePwdPage';
import AccountPage from '../pages/AccountPage';
import AboutPage from './AboutPage';
export default class UserProfile extends Component {
    constructor(props) {
        super(props)
    }

    back() {
        this.props.navigator.pop()
    }

    _logout() {
        console.log('_logout');
        storage.remove({
            key: USERINFO
        });
        global.userInfo = {};
        this.props.navigator.push({
            component: Wrapper,
            args: {currentTab: 'My'}
        });
    }

    _changePwd(){
        this.props.navigator.push({
            component: ChangePwdPage,
            args: {currentTab: 'My'}
        });
    }

    _goToAccount(){
        this.props.navigator.push({
            component: AccountPage
        });
    }


    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <NavBar
                    title="设置"
                    leftIcon="ios-arrow-back"
                    leftPress={this.back.bind(this)}
                />
                <ScrollView>
                    <Item name="账号与安全" first={true} subName ="已保护"onPress={this._goToAccount.bind(this)}/>
                    <Item name="修改密码" first={true} onPress={this._changePwd.bind(this)}/>
                    <Item name="通用"/>
                    <Item name="关于我们" first={true} onPress={()=>{this.props.navigator.push({component: AboutPage})}}/>
                    <Item.Button name="退出登录" first={true} onPress={this._logout.bind(this)}/>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({})