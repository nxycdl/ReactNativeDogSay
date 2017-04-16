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
import Loading from '../component/LoadingBar';
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
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>UserProfile121212</Text>

                <Button onPress={this._setVisiable.bind(this)}
                        title="Learn More"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button">
                </Button>


                <Loading modalVisible={this.state.modalVisible}></Loading>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
