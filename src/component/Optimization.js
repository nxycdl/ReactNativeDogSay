import React, {Component, PropTypes} from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    Platform,
    ScrollView,
    AlertIOS,
    Button,
    RefreshControl,
    TouchableHighlight,
    TouchableNativeFeedback
} from 'react-native'

import {ListItem, CheckBox} from 'react-native-elements'
import {SocialIcon} from 'react-native-elements'
import px2dp from '../util'
/**
 * 优化改进意见;
 */
export default class Optimization extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tag: 0
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ListItem
                    title="你好"
                />
                <Button buttonStyle={styles.button}
                        title='BUTTON18'/>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#397af8',
        borderRadius: 25, marginLeft: 0, marginRight: 0, marginBottom: 0
    },
    radio: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        color: "#666",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        fontSize: px2dp(13),
        backgroundColor: "#fff"
    },
    active: {
        borderColor: "#81c2ff",
        color: "#0096ff"
    },
})