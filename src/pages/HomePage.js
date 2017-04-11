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
export default class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '微建盾欢迎您',
            isLogin: false,
            config : [{icon:"md-contacts", name:"律师团队",subName:"更多",color:"#fc7b53"}]
        }
        this.config = [{icon:"md-contacts", name:"律师团队",subName:"更多",color:"#fc7b53"}]
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
                <ScrollView>
                    <View style={{backgroundColor: '#ADADAD'}}>
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
                        <View>
                            <Item key={0} icon="md-contacts" name="律师团队" subName="更多"color="#fc7b53"></Item>
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
    }
})