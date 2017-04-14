/**
 Created by Administrator on 2017-04-12.
 */
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
    Navigator,
    Alert
} from 'react-native'
import NavBar from '../component/NavBar';
import request from '../util/request';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import px2dp from '../util';
import Item from '../component/Item'

export default class LawyerDetailPages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lawyerInfo: {}
        }
    }

    back() {
        this.props.navigator.pop()
    }

    _fetchLawerInfo() {
        request.get('', '/htgl/app/getlawerinfoById.do', {id: this.props.data.id})
            .then(data => {
                console.log(data);
                if (data.err === '0') {
                    let resultData = data.data;
                    if (resultData.length == 0) {
                        {
                            Alert.alert(
                                'Alert Title',
                                '发送了错误' + data.err,
                                [
                                    {text: 'OK1', onPress: () => this.back.bind(this)},
                                ]
                            )
                        }
                    }
                    let retlist = resultData[0];
                    console.log(retlist)
                    let lawyer = {};
                    lawyer.id = retlist[0];
                    lawyer.name = retlist[1];
                    lawyer.avatar = retlist[2];
                    lawyer.resume = retlist[5];
                    lawyer.tel = retlist[6];
                    lawyer.company = retlist[8];
                    lawyer.des = retlist[11];
                    lawyer.star = retlist[12];
                    lawyer.commentList = [];
                    lawyer.starList = [];
                    retlist[10].map((item, index) => {
                        let starinfo = {};
                        starinfo.id = item.bac001;
                        starinfo.name = item.bac005;
                        starinfo.avatar = item.bac010;
                        starinfo.time = moment(item.bac004).format("YYYY-MM-DD HH:mm:ss");
                        lawyer.starList.push(starinfo);
                    });
                    retlist[9].map((item, index) => {
                        let comment = {};
                        comment.id = item.aam001;
                        comment.name = item.aam008;
                        comment.avatar = item.aam011;
                        comment.time = moment(item.aam006).format("YYYY-MM-DD HH:mm:ss");
                        lawyer.commentList.push(comment);
                    });
                    this.setState({
                        lawyerInfo: lawyer
                    })
                    console.log(this.state.lawyerInfo);
                } else {
                    {
                        Alert.alert(
                            'Alert Title',
                            '发送了错误' + data.err,
                            [
                                {text: 'OK1', onPress: () => this.back.bind(this)},
                            ]
                        )
                    }
                }
            })
            .catch(error => {
                console.warn(error);
            });

    }

    componentDidMount() {
        this._fetchLawerInfo();
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <NavBar
                    title="律师详情"
                    leftIcon="ios-arrow-back"
                    leftPress={this.back.bind(this)}
                />
                <View style={styles.header}>
                    <Image source={{uri: this.state.lawyerInfo.avatar}} style={styles.avatar}></Image>
                    <View>
                        <Text>{this.state.lawyerInfo.name}</Text>
                        <Text>{this.state.lawyerInfo.company}</Text>
                        <Text>联系电话:{this.state.lawyerInfo.tel}</Text>
                    </View>
                </View>
                <View>
                    {/*<Icon name="md-contacts" size={px2dp(26)} color="blue"/>
                     <Text style={{fontSize: 24, textAlign: 'center', marginLeft: 10}}>个人简介</Text>*/}
                    <Item icon="md-flower" name="服务中心" rightIcon="" color="#fc7b53" disable={true}></Item>
                </View>
                <View>
                    <Text style={{fontSize: 12, letterSpacing: 20}}>
                        {this.state.lawyerInfo.des}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
    },
    avatar: {
        width: 60,
        height: 60,
    }
})