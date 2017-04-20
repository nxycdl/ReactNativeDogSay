import React, {Component, PropTypes} from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    Platform,
    ScrollView,
    AlertIOS,
    Alert,
    RefreshControl,
    TouchableHighlight,
    TouchableNativeFeedback
} from 'react-native'
import MyWebView from '../component/MyWebView';
import NavBar from '../component/NavBar';
export default class NewsDetail extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <NavBar
                    leftIcon="ios-arrow-back"
                    leftPress={() => {
                        this.props.navigator.pop()
                    }}
                    title="发现"/>
                <MyWebView
                    source={{uri: 'https://cnodejs.org/topic/58eee565a92d341e48cfe7fc'}}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    webview_style: {
        flex: 1
    }
})
