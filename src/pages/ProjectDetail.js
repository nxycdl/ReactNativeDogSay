/**
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    Platform,
    ScrollView,
    AlertIOS,
    Alert,
    RefreshControl,
    TouchableHighlight,
    TouchableNativeFeedback
} from 'react-native'

import px2dp from '../util';
import Item from '../component/Item';
import NavBar from '../component/NavBar';


export default class ProjectDetail extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this._onRefresh()
    }

    _onRefresh() {

    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <NavBar
                    title="设置"
                    leftIcon="ios-arrow-back"
                    leftPress={()=>{this.navigator.pop()}}
                />
                <ScrollView>
                    <Item name="项目名称" first={true} subName="滨河新区景城片区小微公园、道路节点绿化景观改造提升项目四标段施工废标公告"/>
                    <Item name="项目内容"  subName="关于XXXX"/>
                    <Item name="实施时间"  subName="2017年4月"/>
                    <Item name="施工单位" />
                    <Item name="负责人" />
                    <Item name="联系电话" first={true}/>
                    <Item name="投资金额" first={true}/>
                    <Item name="验收报告" first={true}/>
                </ScrollView>
            </View>
        )
    }
}
