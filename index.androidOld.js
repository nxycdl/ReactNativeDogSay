/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ToolbarAndroid,
    TouchableHighlight
} from 'react-native';

//引入tabbar支持包
import TabNavigator from 'react-native-tab-navigator';

const TabNavigatorItem = TabNavigator.Item;

const TAB_NORMAL_1 = require('./src/images/logo/logo.png');
const TAB_NORMAL_2 = require('./src/images/logo/logo.png');
const TAB_NORMAL_3 = require('./src/images/logo/logo.png');
const TAB_NORMAL_4 = require('./src/images/logo/logo.png');

const TAB_PRESS_1 = require('./src/images/logo/logo.png');
const TAB_PRESS_2 = require('./src/images/logo/logo.png');
const TAB_PRESS_3 = require('./src/images/logo/logo.png');
const TAB_PRESS_4 = require('./src/images/logo/logo.png');

export default class ReactNativeDogSay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Home',
        };
    }

    render() {
        var tabBarView = this.tabBarView();
        return (
            <View style={styles.container}>
                {tabBarView}
            </View>
        );
    }

    /**
     自定义tabbar
     **/
    tabBarView() {
        return (
            <TabNavigator
                tabBarStyle={styles.tab}
            >
                {this.renderTabView('头条', 'Home', '头条板块', true)}
                {this.renderTabView('视频', 'Video', '视频板块', false)}
                {this.renderTabView('关注', 'Follow', '关注板块', false)}
                {this.renderTabView('我的', 'Mine', '我的板块', false)}
            </TabNavigator>
        );
    }

    /**
     渲染每项
     **/
    renderTabView(title, tabName, tabContent, isBadge) {
        var tabNomal;
        var tabPress;
        switch (tabName) {
            case 'Home':
                tabNomal = TAB_NORMAL_1;
                tabPress = TAB_PRESS_1;
                break;
            case 'Video':
                tabNomal = TAB_NORMAL_2;
                tabPress = TAB_PRESS_2;
                break;
            case 'Follow':
                tabNomal = TAB_NORMAL_3;
                tabPress = TAB_PRESS_3;
                break;
            case 'Mine':
                tabNomal = TAB_NORMAL_4;
                tabPress = TAB_PRESS_4;
                break;
            default:

        }
        return (
            <TabNavigatorItem
                title={title}
                renderIcon={() => <Image style={styles.tabIcon} source={tabNomal}/>}
                renderSelectedIcon={() => <Image style={styles.tabIcon} source={tabPress}/>}
                selected={this.state.selectedTab === tabName}
                selectedTitleStyle={{color: '#f85959'}}
                onPress={() => this.onPress(tabName)}
                renderBadge={() => isBadge ?
                    <View style={styles.badgeView}><Text style={styles.badgeText}>15</Text></View> : null}
            >
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>{tabContent}</Text></View>
            </TabNavigatorItem>
        );
    }

    /**
     tab点击方法
     **/
    onPress(tabName) {
        if (tabName) {
            this.setState(
                {
                    selectedTab: tabName,
                }
            );
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    tab: {
        height: 52,
        alignItems: 'center',
        backgroundColor: '#f4f5f6',
    },
    tabIcon: {
        width: 25,
        height: 25,
    },
    badgeView: {
        width: 22,
        height: 14,
        backgroundColor: '#f85959',
        borderWidth: 1,
        marginLeft: 10,
        marginTop: 3,
        borderColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    badgeText: {
        color: '#fff',
        fontSize: 8,
    }
});

AppRegistry.registerComponent('ReactNativeDogSay', () => ReactNativeDogSay);
