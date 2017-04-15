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
    Dimensions
} from 'react-native'
import NavBar from '../component/NavBar';
import px2dp from '../util';
const {width, height} = Dimensions.get('window')
export default class MyMessageDtail extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{backgroundColor: "white", height: height}}>
                <NavBar
                    title="我的消息"
                    leftIcon="ios-arrow-back"
                    leftPress={() => {
                        this.props.navigator.pop()
                    }}
                />
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
            </View>
        )
    }
}

const styles = StyleSheet.create({

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