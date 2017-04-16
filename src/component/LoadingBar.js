/**
 Created by Administrator on 2017-04-16.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    ProgressBarAndroid,
    ProgressViewIOS,
    Modal,
    Platform
} from 'react-native';
export default class Loading extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <Modal
                transparent={true}
                onRequestClose={() => this.onRequestClose()}
            >
                <View style={styles.loadingBox}>
                    {
                        Platform.OS === 'ios' ? <ProgressViewIOS progress={this.getProgress(0)} />
                            : <ProgressBarAndroid styleAttr='Inverse' color='#FF4500'/>
                    }
                </View>
            </Modal>
        )
    }
}


const styles = StyleSheet.create({
    loadingBox: { // Loading居中
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
})