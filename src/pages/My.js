import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
    Platform,
    AlertIOS,
    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    RefreshControl
} from 'react-native'
import NavBar from '../component/NavBar'
import Item from '../component/Item'
import Setting from './SettingPage'
import UserProfile from './UserProfilePage'
import MyMessagePage from './MyMessagePage'
import px2dp from '../util'

import Icon from 'react-native-vector-icons/Ionicons'
import LoginPage from "./LoginPage";
import ImagePicker from 'react-native-image-picker';
let {width, height} = Dimensions.get('window')
import {USERINFO} from '../util/GlobalType';
import request from '../util/request';

export default class My extends Component {
    constructor(props) {
        super(props)
        /*let avator = require('../images/index/avatar.jpg');
         if (global.userInfo.avatar) {
         avator = {uri: global.userInfo.avatar}
         }*/

        this.state = {
            isRefreshing: false,
            isLoging: !_.isEmpty(global.userInfo),
            userInfo: global.userInfo
        }
        this.config = [
            {icon: "md-images", name: "我的消息", subName: "5", onPress: this.goPage.bind(this, "myMessagePage")},
            {icon: "ios-heart", name: "我的收藏", color: "#fc7b53"},
            {icon: "logo-usd", name: "最近通知", color: "#fc7b53"},
            {icon: "ios-cart", name: "最近会议", subName: "", color: "#94d94a"},
            {icon: "ios-medal", name: "反馈意见", subName: "", color: "#ffc636"},
        ]
    }

    goPage(key, data = {}) {
        let pages = {
            "myMessagePage": MyMessagePage
        }
        if (pages[key]) {
            this.props.navigator.push({
                component: pages[key],
                args: {data}
            })
        }
    }

    leftPress() {

    }

    rightPress() {
        this.props.navigator.push({
            component: Setting,
            args: {}
        });
    }

    goProfile() {
        this.props.navigator.push({
            component: UserProfile,
            args: {}
        });
    }

    componentDidMount() {

    }


    _onRefresh() {
        /*this.setState({isRefreshing: true});
         setTimeout(() => {
         this.setState({isRefreshing: false});
         }, 1500)*/
    }

    _filterMobile() {
        let mobile = this.state.userInfo.mobile || '';
        if (mobile.length = 11) {
            mobile = mobile.substr(0, 3) + "****" + mobile.substr(7, 4);
        }
        return mobile
    }

    _renderListItem() {
        return this.config.map((item, i) => {
            if (i % 3 == 0) {
                item.first = true
            }
            return (<Item key={i} {...item}/>)
        })
    }

    _afterLogin() {
        this.setState({
            isLoging: true,
            userInfo: global.userInfo
        });
    }


    _changeAvatar(event) {
        var _this = event;
        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */

        /**
         * 摄像机默认属性;
         * @type {{title: string, customButtons: [*], storageOptions: {skipBackup: boolean, path: string}}}
         */
        var options = {
            title: '',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '从相册选择',
            storageOptions: {
                skipBackup: false,
                path: 'images'
            }
        };



        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let uri = response.uri;
                //post 到服务器上面;
                request.postJson(' http://rapapi.org/mockjs/16792/','api/changeAvatar')
                    .then((response) => {
                        let error = response.error;

                        if (response.success == false) {
                            toastShort(error, () => {
                            });
                            return;
                        }

                        let uri = response.result[0].uri;
                        global.userInfo.avatar = uri;
                        console.log(uri);
                        storage.save({
                            key: USERINFO,
                            rawData: global.userInfo,
                            expires: 1000 * 3600 * 24 * 7
                        });
                        this.setState({

                        });
                    }).catch((error) => {
                    this.setState({isLoging: false});
                    console.warn(error);
                    /*Toast.show.bind(null, error);*/
                })

            }
        });
    }

    render() {
        if (_.isEmpty(global.userInfo)) {
            return <LoginPage afterLogin={this._afterLogin.bind(this)}/>
        }
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <NavBar
                    title="我的"
                    leftIcon="ios-notifications-outline"
                    leftPress={this.leftPress.bind(this)}
                    rightIcon="ios-settings-outline"
                    rightPress={this.rightPress.bind(this)}
                />
                <ScrollView
                    style={styles.scrollView}
                >
                    <View style={{minHeight: height - 64 - px2dp(46), paddingBottom: 100, backgroundColor: "#f3f3f3"}}>
                        <TouchableWithoutFeedback onPress={this.goProfile.bind(this)}>
                            <View style={styles.userHead}>
                                <View style={{flex: 1, flexDirection: "row"}}>
                                    <TouchableOpacity onPress={this._changeAvatar.bind(this)}>
                                        <Image
                                            source={global.userInfo.avatar ? {uri: global.userInfo.avatar} : (require('../images/index/avatar.jpg'))}
                                            style={{width: px2dp(60), height: px2dp(60), borderRadius: px2dp(30)}}/>
                                    </TouchableOpacity>
                                    <View style={{flex: 1, marginLeft: 10, paddingVertical: 5}}>
                                        <Text style={{
                                            color: "#fff",
                                            fontSize: px2dp(18)
                                        }}>{this.state.userInfo.username || '请设置您的用户名!'}</Text>
                                        <View style={{marginTop: px2dp(10), flexDirection: "row"}}>
                                            <Icon name="ios-phone-portrait-outline" size={px2dp(14)} color="#fff"/>
                                            <Text
                                                style={{
                                                    color: "#fff",
                                                    fontSize: 13,
                                                    paddingLeft: 5
                                                }}>{this._filterMobile()}</Text>
                                        </View>
                                    </View>
                                </View>
                                <Icon name="ios-arrow-forward-outline" size={px2dp(22)} color="#fff"/>
                            </View>
                        </TouchableWithoutFeedback>
                        <View>
                            {this._renderListItem()}
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    scrollView: {
        marginBottom: px2dp(46),
        backgroundColor: "#0398ff"
    },
    userHead: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "#0398ff"
    },
    numbers: {
        flexDirection: "row",
        backgroundColor: "#fff",
        height: 74
    },
    numItem: {
        flex: 1,
        height: 74,
        justifyContent: "center",
        alignItems: "center"
    }
})
