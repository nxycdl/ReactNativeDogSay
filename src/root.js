import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Platform,
    BackAndroid
} from 'react-native'
import Navigation from './app'
import SplashScreen from 'react-native-splash-screen';
import {USERINFO} from '../src/util/GlobalType';
import _ from 'lodash';


export default class rootApp extends Component {

    getUser() {
        storage.load({
            key: USERINFO
        }).then(ret => {
            global.userInfo = ret;
        }).catch(err => {
            global.userInfo = {};
            console.warn('err', err)
        })
        /*storage.remove({
            key: USERINFO
        });*/
    }


    componentDidMount() {
        global._ = _;
        this.getUser();
        SplashScreen.hide();
    }

    render() {
        return (
            <View style={{backgroundColor: Platform.OS == "ios" ? "#000" : "#0398ff", flex: 1}}>
                <Navigation/>
            </View>
        )
    }
}