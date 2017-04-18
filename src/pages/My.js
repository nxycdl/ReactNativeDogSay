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
let {width, height} = Dimensions.get('window')

export default class My extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isRefreshing: false,
            avatar: require('../images/index/avatar.jpg'),
            isLoging: false
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
        this._onRefresh();
        this._checkIsLogin();
    }

    _checkIsLogin() {
        storage.load({
            key: 'userInfo'
        }).then(ret => {
            console.log('_checkIsLogin', ret);
            this.setState({isLoging: true});
        }).catch(err => {
            console.log('err', err)
        })
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            this.setState({isRefreshing: false});
        }, 1500)
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
            isLoging: true
        });
    }

    render() {
        if (!this.state.isLoging) {
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
                                    <Image source={this.state.avatar}
                                           style={{width: px2dp(60), height: px2dp(60), borderRadius: px2dp(30)}}/>
                                    <View style={{flex: 1, marginLeft: 10, paddingVertical: 5}}>
                                        <Text style={{color: "#fff", fontSize: px2dp(18)}}>_平行时空</Text>
                                        <View style={{marginTop: px2dp(10), flexDirection: "row"}}>
                                            <Icon name="ios-phone-portrait-outline" size={px2dp(14)} color="#fff"/>
                                            <Text
                                                style={{color: "#fff", fontSize: 13, paddingLeft: 5}}>135****0418</Text>
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
