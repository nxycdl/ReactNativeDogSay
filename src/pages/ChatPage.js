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
    TouchableOpacity
} from 'react-native'

import { toastShort } from '../util/ToastUtil';

export default class Chat extends Component {
    constructor(props) {
        super(props)
    }

    _onLoging() {
        toastShort('测试Toast');
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress={this._onLoging.bind(this)}>
                    <View style={styles.buttonview}>
                        <Text style={styles.logintext}>登 录3</Text>
                    </View>
                </TouchableOpacity>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    header: {
        height: 50,
        backgroundColor: '#12B7F5',
        justifyContent: 'center',
    },
    headtitle: {
        alignSelf: 'center',
        fontSize: 20,
        color: '#ffffff',
    },
    avatarview: {
        height: 150,
        backgroundColor: '#ECEDF1',
        justifyContent: 'center',
    },
    avatarimage: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    marginTopview: {
        height: 15,
        backgroundColor: '#F7F7F9'
    },
    inputview: {
        height: 100,
    },
    textinput: {
        flex: 1,
        fontSize: 16,
    },
    dividerview: {
        flexDirection: 'row',
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#ECEDF1'
    },
    bottomview: {
        backgroundColor: '#ECEDF1',
        flex: 1,
    },
    buttonview: {
        backgroundColor: '#1DBAF1',
        margin: 10,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logintext: {
        fontSize: 17,
        color: '#FFFFFF',
        marginTop: 10,
        marginBottom: 10,
    },
    emptyview: {
        flex: 1,
    },
    bottombtnsview: {
        flexDirection: 'row',
    },
    bottomleftbtnview: {
        flex: 1,
        height: 50,
        paddingLeft: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    bottomrightbtnview: {
        flex: 1,
        height: 50,
        paddingRight: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    bottombtn: {
        fontSize: 15,
        color: '#1DBAF1',
    }
});