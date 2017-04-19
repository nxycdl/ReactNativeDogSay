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
    Modal,
    Dimensions
} from 'react-native'

import MySwiperIndex from '../component/MySwiperIndex';
import NavBar from '../component/NavBar';
import Item from '../component/Item';
import px2dp from '../util'
import request from '../util/request';
import LawyerSwiper from '../component/LawyerSwiper';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('window');

const itemHeight = px2dp(20);
const quickBarWidth = px2dp(14);

export default class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '微建盾欢迎您',
            isLogin: false,
            hotLawyerList: [],
            infoList: [{}],
            modalVisible: false
        }
    }

    _leftPress() {
        console.log('leftPress');
    }

    _rightPress() {
        console.log('_rightPress');
    }

    _quickBarClick() {
        console.log('quickBarClick');
        this.setState({
            modalVisible: true
        });
    }

    _renderQuickMsgBtn(pos) {
        let name = 'envelope-o';
        name = pos === 'right' ? 'angle-right' : name;

        return (<View>
            <Icon name={name} size={quickBarWidth} color="#fff"/>
        </View>)
    }


    _renderQuickMsg() {

        if (Platform.OS === 'android') {
            return (
                <TouchableNativeFeedback onPress={this._quickBarClick.bind(this)}>
                    <View style={styles.quickbar}>
                        {this._renderQuickMsgBtn('left')}
                        <Text numberOfLines={1}
                              style={{flex: 1, textAlign: 'left', fontStyle: 'italic'}}>这里放点临时公告</Text>
                        {this._renderQuickMsgBtn('right')}
                    </View>
                </TouchableNativeFeedback>
            )

        } else {
            return (
                <TouchableOpacity onPress={this._quickBarClick.bind(this)}>
                    <View style={styles.quickbar}>
                        {this._renderQuickMsgBtn('left')}
                        <Text numberOfLines={1}
                              style={{
                                  flex: 1,
                                  textAlign: 'left',
                                  fontStyle: 'italic',
                                  backgroundColor: ''
                              }}>这里放点临时公告</Text>
                        {this._renderQuickMsgBtn('right')}
                    </View>
                </TouchableOpacity>
            )
        }
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

                <ScrollView >
                    <MySwiperIndex></MySwiperIndex>
                    {this._renderQuickMsg()}
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
                            {/*<LawyerSwiper imageList={this.state.hotLawyerList} itemHeight={px2dp(80)}></LawyerSwiper>*/}
                            <LawyerSwiper {...this.props} ></LawyerSwiper>
                        </View>
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>君子不立危险墙之下</Text>
                            <Text style={styles.footerText}>@xxxxxxx宁夏xxxxx公司</Text>
                        </View>
                    </View>

                <Modal
                    animationType={"slide"}
                    backgroundColor={'red'}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert("Modal has been closed.")
                    }}
                >
                    <View style={{
                        flex: 1,
                        padding: 20, backgroundColor: '#f5fcff'
                    }}>
                        <View>
                            <Text style={styles.msg_header}>消息头</Text>
                            <View style={styles.subtext}>
                                <Text>发布人：xxxx</Text>
                                <Text>发布时间:201701010101</Text>

                            </View>
                            <ScrollView>
                                <Text style={styles.text} selectable={true}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet asperiores consequatur
                                    debitis dicta dolore dolorem eos ex harum impedit inventore iure, non nulla pariatur
                                    provident quos repellat sapiente temporibus voluptatibus
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet asperiores consequatur
                                    debitis dicta dolore dolorem eos ex harum impedit inventore iure, non nulla pariatur
                                    provident quos repellat sapiente temporibus voluptatibus
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet asperiores consequatur
                                    debitis dicta dolore dolorem eos ex harum impedit inventore iure, non nulla pariatur
                                    provident quos repellat sapiente temporibus voluptatibus
                                </Text>
                            </ScrollView>
                        </View>
                        <View style={{
                            position: 'absolute',
                            bottom: 20,
                            justifyContent: 'center',
                            width: width,
                            alignItems: 'center',
                            flex: 1
                        }}>
                            <TouchableHighlight onPress={() => this.setState({modalVisible:false})}>
                                <Icon name={'times'} size={44} color="red"/>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
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
    },
    quickbar: {
        height: quickBarWidth,
        backgroundColor: "#0398ff",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        paddingHorizontal: px2dp(10)
    },
    btn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    msg_header: {
        fontSize: px2dp(14),
        height: NavBar.topbarHeight - 10,
        backgroundColor: "white",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        paddingHorizontal: px2dp(10)
    },
    subtext: {
        backgroundColor: 'rgba(7,17,27,0.1)',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        marginTop: 10,
        fontWeight: '500',
        lineHeight: 20
    }

})