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
    Button
} from 'react-native'
export default class ChatPage extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            modalVisible: true
        });
    }

    _setVisiable() {
        this.setState({
            modalVisible: true
        });
    }

    render() {
        return (
            <View><Text>this is  a test </Text></View>
        )
    }
}

const styles = StyleSheet.create({})
