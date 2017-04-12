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
import Swiper from 'react-native-swiper';
import px2dp from '../util'
let height = px2dp(80);

export default class LawyerSwiper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            banner01: require('../images/banner/banner01.png'),
            banner02: require('../images/banner/banner02.png'),
            banner03: require('../images/banner/banner03.png'),
        }
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

    _renderImageItem(item,key){
        console.log(item);
        return (
            <View style={styles.slidewarp}>
                {/*<Image source={item.url} style={styles.imageItem}></Image>*/}
                <Text style={styles.text}>234234234</Text>
            </View>
        )
    }

    _renderData() {
        if (this.props.imageList && this.props.imageList.length > 0) {
            return <ScrollView>
                this.props.imageList.map((item, i) => this._renderImageItem(item, i));
            </ScrollView>
        }
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