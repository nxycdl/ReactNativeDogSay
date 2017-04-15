import React, {Component, PropTypes} from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    Platform,
    ScrollView,
    Alert,
    RefreshControl,
    TouchableHighlight,
    TouchableNativeFeedback,
    Dimensions
} from 'react-native'

const {width, height} = Dimensions.get('window')
import no_log from '../images/logo/no_log.png';
import request from '../util/request';
import NavBar from '../component/NavBar';
import px2dp from '../util';
import MyMessageDtail from './MyMessageDetail';

import is_reading from '../images/logo/is_reading.png';
import un_reading from '../images/logo/un_reading.png';
class Item extends Component {
    constructor(props) {
        super(props);
    }

    _goToDetail2() {
        console.log('xx');
    }

    _goToDetail(id) {
        this.props.navigator.push({
            component: MyMessageDtail,
            args: {id: id}
        })
    }


    render() {
        const {title, state, date, author, isReading} = this.props
        let render = (
            <View style={styles.item}>
                <Image source={isReading ? is_reading : un_reading} style={styles.logo}/>
                <View style={styles.info}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={{fontSize: px2dp(14), color: "#333"}}>{title}</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", paddingVertical: 16}}>
                        <Text style={{fontSize: px2dp(13), color: "#aaa"}}>发布人：{author}</Text>
                        <Text style={{fontSize: px2dp(13), color: "#333"}}>{date}</Text>
                    </View>
                </View>
            </View>
        )
        return (
            Platform.OS === 'ios' ? (
                <TouchableHighlight style={{marginTop: 10}}
                                    onPress={this._goToDetail.bind(this, this.props.id)}>{render}</TouchableHighlight>
            ) : (
                <View style={{marginTop: 10}}><TouchableNativeFeedback
                    onPress={this._goToDetail.bind(this, this.props.id)}>{render}</TouchableNativeFeedback></View>
            )
        )
    }
}
export default class MyMessagePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isRefreshing: false,
            currentPage: 1,
            pageSize: 10
        }
        console.log(props);
    }

    componentDidMount() {
        this._onRefresh();
    }

    _onRefresh() {
        if (this.state.isRefreshing == true) {
            return;
        }
        this.setState({
            isRefreshing: true
        });
        //http://rapapi.org/mockjsdata/16792/api/getMyMessageList?accessToken=12342
        var params = {
            accessToken: "124",
            page: this.state.currentPage
        }
        request.get('http://rapapi.org/mockjs/16792', '/api/getMyMessageList', params)
            .then((data) => {
                if (data.success === true) {
                    var result = this.state.data;
                    console.log(data.result);
                    result = data.result.concat(result);
                    this.setState({
                        isRefreshing: false,
                        data: result
                    });
                    if (data.result.length >= 0) {
                        this.setState({
                            currentPage: this.state.currentPage + 1
                        })
                    }
                } else {
                    Alert.alert('系统发生了异常:', data.error);
                    this.setState({
                        isRefreshing: false
                    });
                }
            })
            .catch((error) => {
                console.warn(error);
                this.setState({
                    isRefreshing: false
                });
                Alert.alert('系统发生了异常:', error);
            });
    }

    _noData() {
        return (
            <View style={{alignItems: "center", paddingTop: 50, height: height - 42}}>
                <Image source={no_log} style={styles.noData}/>
                <Text style={{color: "#aaa"}}>{"无消息记录"}</Text>
            </View>
        )
    }


    _showData() {
        return (
            this.state.data.map((item, i) => {
                return <Item key={i} {...item} {...this.props}/>
            }))
    }


    render() {
        return (
            <View>
                <NavBar
                    title="我的消息列表"
                    leftIcon="ios-arrow-back"
                    leftPress={() => {
                        this.props.navigator.pop()
                    }}
                />
                <ScrollView style={{backgroundColor: "#f3f3f3"}}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                    tintColor="#bbb"
                                    colors={['#ddd', '#0398ff']}
                                    progressBackgroundColor="#ffffff"
                                />
                            }
                >
                    {
                        (() => {
                            return this.state.data.length ?
                                this._showData() : this._noData()
                        })()
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
        /*backgroundColor: "#fff",*/
        borderBottomWidth: 1,
        //borderBottomColor: "#eee",
        paddingTop: 16
    },
    noData: {
        width: 149,
        height: 138,
        resizeMode: "cover",
        marginBottom: 16
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