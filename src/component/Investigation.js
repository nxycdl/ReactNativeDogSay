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
/**
 * 调查意见；
 */
export default class Investigation extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>investigation</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({})