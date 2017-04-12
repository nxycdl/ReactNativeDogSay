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

import MySwiperIndex from '../component/MySwiperIndex';
import NavBar from '../component/NavBar';
import Item from '../component/Item';
import px2dp from '../util'
import request from '../util/request';
import LawyerSwiper from '../component/LawyerSwiper';

const itemHeight = px2dp(20);

export default class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '微建盾欢迎您',
            isLogin: false,
            hotLawyerList: []
        }
    }

    componentDidMount() {
        this._fetchLawerInfoList();
    }

    _fetchLawerInfoList() {
        console.log('xxx');
        request.get('', '/htgl/app/getweixintoplawerinfo.do', {limit: 5})
            .then(data => {
                if (data.err === '0') {
                    let hotLawyerList = this.state.hotLawyerList;
                    hotLawyerList.concat(data.data);
                    this.setState({
                        hotLawyerList: hotLawyerList
                    });
                    console.log('1', hotLawyerList);
                    console.log('2', this.state.hotLawyerList);
                }
            })
            .catch(error => {
                console.warn(error);
            });

    }

    _leftPress() {
        console.log('leftPress');
    }

    _rightPress() {
        console.log('_rightPress');
    }

    render() {
        let rightIcon = (this.state.isLogin === true ? 'ios-log-out' : 'ios-log-in');
        return (
            <View>
                <NavBar title={this.state.title}
                        leftIcon="ios-menu"
                        rightIcon={rightIcon}
                        leftPress={this._leftPress.bind(this)}
                        rightPress={this._rightPress.bind(this)}></NavBar>
                <MySwiperIndex></MySwiperIndex>
                <ScrollView contentContainerStyle={{height: 1000}}>
                    <View style={{flex: 1, backgroundColor: '#ADADAD'}}>
                        <View style={styles.imageitem}>
                            <View style={{backgroundColor: 'white'}}>
                                <Image source={require('../images/index/f1.png')} style={styles.baseimage}/>
                                <Text style={{textAlign: 'center'}}>我的合同</Text>
                            </View>
                            <View style={{backgroundColor: 'white'}}>
                                <Image source={require('../images/index/f2.png')} style={styles.baseimage}/>
                                <Text style={{textAlign: 'center'}}>我的消息</Text>
                            </View>
                            <View style={{backgroundColor: 'white'}}>
                                <Image source={require('../images/index/f3.png')} style={styles.baseimage}/>
                                <Text style={{textAlign: 'center'}}>新手导航</Text>
                            </View>

                        </View>
                        <View style={[styles.imageitem, {marginTop: 5, marginBottom: 10}]}>
                            <View style={{backgroundColor: 'white'}}>
                                <Image source={require('../images/index/f4.png')} style={styles.baseimage}/>
                                <Text style={{textAlign: 'center'}}>建盾内刊</Text>
                            </View>
                            <View style={{backgroundColor: 'white'}}>
                                <Image source={require('../images/index/f5.png')} style={styles.baseimage}/>
                                <Text style={{textAlign: 'center'}}>体检建盾</Text>
                            </View>
                            <View style={{backgroundColor: 'white'}}>
                                <Image source={require('../images/index/f6.png')} style={styles.baseimage}/>
                                <Text style={{textAlign: 'center'}}>建盾社区</Text>
                            </View>

                        </View>
                        <View style={styles.lawyercaption}>
                            <Item key={0} icon="md-contacts" name="律师团队" subName="更多" color="#fc7b53"
                                  itemHeight={px2dp(20)}></Item>
                        </View>
                        <View style={{backgroundColor: 'white', marginTop: 1, height: px2dp(100)}}>
                            <LawyerSwiper imageList={this.state.hostLawyerList} itemHeight={px2dp(80)}></LawyerSwiper>
                        </View>
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>君子不立危险墙之下</Text>
                            <Text style={styles.footerText}>@xxxxxxx宁夏xxxxx公司</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    imageitem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 5,
        marginRight: 5
    },
    baseimage: {
        width: 100,
        height: 100,
        margin: 5
    },
    footer: {
        flex: 1,
        height: 50
    },
    footerText: {
        fontSize: 10,
        textAlign: 'center',
    },
    lawyercaption: {
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth
    }
})