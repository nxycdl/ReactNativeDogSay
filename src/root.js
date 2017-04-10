import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Platform
} from 'react-native'
import Navigation from './app'

export default class rootApp extends Component {
    render() {
        return (
            <View style={{backgroundColor: Platform.OS == "ios" ? "#000" : "#0398ff", flex: 1}}>
                <Navigation/>
            </View>
        )
    }
}