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
import Investigation from '../component/Investigation';
import Optimization from '../component/Optimization' ;
import TabViewBar from '../component/TabViewBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';


export default class Feedback extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <NavBar title="意见"/>
                <ScrollableTabView renderTabBar={() => <TabViewBar/>}>
                    <Optimization tabLabel="优化改进意见"/>
                    <Investigation tabLabel="调查意见"/>
                </ScrollableTabView>
            </View>
        )
    }
}


const styles = StyleSheet.create({})