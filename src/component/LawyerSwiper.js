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
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    Navigator
} from 'react-native'
import Swiper from 'react-native-swiper';
import px2dp from '../util'
import request from '../util/request';
import LawyerDetailPages from '../pages/LawyerDetailPages';
let height = px2dp(80);

export default class LawyerSwiper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            banner01: require('../images/banner/banner01.png'),
            banner02: require('../images/banner/banner02.png'),
            banner03: require('../images/banner/banner03.png'),
            hotLawyerList: []
        }
    }

    _fetchLawerInfoList() {
        request.get('', '/htgl/app/getweixintoplawerinfo.do', {limit: 5})
            .then(data => {
                console.log('_fetchLawerInfoList', data);
                if (data.err === '0') {
                    let retlist = data.data;
                    console.log(retlist);
                    let hotLawyerList = this.state.hotLawyerList;
                    hotLawyerList = hotLawyerList.concat(retlist);
                    this.setState({
                        hotLawyerList: hotLawyerList
                    });
                }
            })
            .catch(error => {
                console.warn(error);
            });

    }

    componentDidMount() {
        this._fetchLawerInfoList();
    }

    _render() {
        return <ScrollView horizontal={true}>
            <View style={styles.wrapper}>
                <View style={styles.slidewarp}>
                    <Image source={this.state.banner02} style={styles.imageItem}></Image>
                    <Text style={styles.text}>234234234</Text>
                </View>
                <View style={styles.slidewarp}>
                    <Image source={this.state.banner02} style={styles.imageItem}></Image>
                    <Text style={styles.text}>234234234</Text>
                </View>
                <View style={styles.slidewarp}>
                    <Image source={this.state.banner03} style={styles.imageItem}></Image>
                    <Text style={styles.text}>234234234</Text>
                </View>
                <View style={styles.slidewarp}>
                    <Image source={this.state.banner03} style={styles.imageItem}></Image>
                    <Text style={styles.text}>234234234</Text>
                </View>
                <View style={styles.slidewarp}>
                    <Image source={this.state.banner03} style={styles.imageItem}></Image>
                    <Text style={styles.text}>234234234</Text>
                </View>
                <View style={styles.slidewarp}>
                    <Image source={this.state.banner03} style={styles.imageItem}></Image>
                    <Text style={styles.text}>234234234</Text>
                </View>
                <View style={styles.slidewarp}>
                    <Image source={this.state.banner03} style={styles.imageItem}></Image>
                    <Text style={styles.text}>234234234</Text>
                </View>
                <View style={styles.slidewarp}>
                    <Image source={this.state.banner03} style={styles.imageItem}></Image>
                    <Text style={styles.text}>234234234</Text>
                </View>
                <View style={styles.slidewarp}>
                    <Image source={this.state.banner03} style={styles.imageItem}></Image>
                    <Text style={styles.text}>234234234</Text>
                </View>
            </View>
        </ScrollView>
    }

    _goPage(key, data = {}) {
        let pages = {
            "showLawyerDetail": LawyerDetailPages
        }
        if (pages[key]) {
            this.props.navigator.push({
                component: pages[key],
                args: {data}
            });
        }
    }

    _renderImageItem(item, key) {
        return (
            <TouchableWithoutFeedback key={key} onPress={this._goPage.bind(this, 'showLawyerDetail', {id: item[0]})}>
                <View >
                    <Image source={{uri: item[2]}} style={styles.imageItem}></Image>
                    <Text style={styles.text}>{item[1]}</Text>
                </View >
            </TouchableWithoutFeedback>
        )
    }

    _renderData() {
        if (this.state.hotLawyerList && this.state.hotLawyerList.length > 0) {
            return <ScrollView horizontal={true}>
                <View style={styles.wrapper}>
                    {this.state.hotLawyerList.map((item, i) => this._renderImageItem(item, i))}
                </View>
            </ScrollView>
        }
        return <ScrollView></ScrollView>
    }

    render() {
        return (
            this._renderData()
        )
    }
}

var styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    imageItem: {
        height: height - 10,
        width: height,
        marginLeft: 5,
        backgroundColor: '#9DD6EB',
    },
    text: {
        textAlign: 'center'
    }
})