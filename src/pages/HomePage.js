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
export default class index extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>index</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({})