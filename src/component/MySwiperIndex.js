/**
 Created by Administrator on 2017-04-11.
 */
import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet
} from 'react-native'
import Swiper from 'react-native-swiper';

export default class MySwiperIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            banner01:require('../images/banner/banner01.png'),
            banner02:require('../images/banner/banner02.png'),
            banner03:require('../images/banner/banner03.png'),
        }
    }


    render() {
        return (
            <Swiper style={styles.wrapper} height={200}
                    showsButtons={true}
                    >
                <View style={styles.slide1}>
                    <Image source ={this.state.banner01} height={100}></Image>
                </View>
                <View style={styles.slide2}>
                    <Image source ={this.state.banner02} height={100}></Image>
                </View>
                <View style={styles.slide3}>
                    <Image source ={this.state.banner03} height={100}></Image>
                </View>
            </Swiper>
        )
    }
}



var styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,

        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,

        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,

        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
})