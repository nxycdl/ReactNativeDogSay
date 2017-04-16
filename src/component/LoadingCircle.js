/**
 Created by Administrator on 2017-04-16.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Modal
} from 'react-native'
export default class LoadingCircle extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Modal
                transparent={true}
                onRequestClose={() => this.onRequestClose()}
            >
                <View style={styles.loadingBox}>
                    <ActivityIndicator
                        animating={true}
                        style={[styles.centering, {height: 80,transform: [{scale: 2}]}]}
                        color="#00aa00"
                        size="large"
                    />
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    gray: {
        backgroundColor: '#cccccc',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 8,
    },
    loadingBox: { // Loading居中
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
});