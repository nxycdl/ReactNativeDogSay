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

import px2dp from '../util'
import ProjectDetail from '../pages/ProjectDetail'
import Icon from 'react-native-vector-icons/FontAwesome';
import NavBar from '../component/NavBar';
import projectList from '../../projectList.json';


class Item extends Component {
    constructor(props) {
        super(props)
    }

    _openWebView(id,) {
        this.props.navigator.push({
            component: ProjectDetail,
            args: {id: id}
        });
    }


    render() {
        const {id, title, date, fzr, status} = this.props
        let render = (
            <View style={styles.item}>
                <View style={styles.info}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text
                            style={{fontSize: px2dp(14), color: "#333", flex: 1}}>{title}</Text>
                        {status === '1' ? <Icon name="free-code-camp" color="red" size={px2dp(13)}/> : (null)}

                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", paddingVertical: 16}}>
                        <Text style={{fontSize: px2dp(13), color: "#aaa"}}>{fzr}</Text>
                        <Text style={{fontSize: px2dp(13), color: "#333"}}>{date}</Text>
                    </View>
                </View>
            </View>
        )


        return (
            Platform.OS === 'ios' ? (
                <TouchableHighlight style={{marginTop: 10}} onPress={this._openWebView.bind(this, id)}
                >{render}</TouchableHighlight>
            ) : (
                <View style={{marginTop: 10}}><TouchableNativeFeedback
                    onPress={this._openWebView.bind(this, id)}>{render}</TouchableNativeFeedback></View>
            )
        )
    }
}
export default class ProjectPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isRefreshing: false
        }
    }

    componentDidMount() {
        this._onRefresh()
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            this.setState({
                data: projectList,
                isRefreshing: false
            });
        }, 1000)
    }

    render() {
        return (
            <View>
                <NavBar
                    leftIcon="ios-arrow-back"
                    leftPress={() => {
                        this.props.navigator.pop()
                    }}
                    title="项目"/>

                <ScrollView
                    style={{backgroundColor: "#f3f3f3"}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#bbb"
                            colors={['#ddd', '#0398ff']}
                            progressBackgroundColor="#ffffff"
                        />
                    }>

                    {
                        this.state.data.map((item, i) => {
                            return <Item key={i} {...item} {...this.props} />
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        paddingLeft: 16,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingTop: 16
    },
    logo: {
        width: 35,
        height: 35,
        marginRight: 8,
        resizeMode: "cover",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#f5f5f5"
    },
    info: {
        paddingRight: 16,
        flex: 1
    }
})
