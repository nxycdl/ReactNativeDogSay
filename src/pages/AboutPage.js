/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React from 'react';
import {
    StyleSheet,
    Image,
    Text,
    Linking,
    View,
    Button
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
/*import Button from '../component/Button';*/

const API_STORE = 'http://apistore.baidu.com/';
const READING_REPO = 'https://github.com/attentiveness/reading';
import NavBar from '../component/NavBar';
const aboutLogo = require('../images/logo/about_logo.png');


class About extends React.Component {
    componentDidMount() {

    }

    onPress(url) {
        Linking.openURL(url);
    }

    renderRightButton() {
        /*return (
            <Icon.Button
                name="logo-github"
                backgroundColor="transparent"
                underlayColor="transparent"
                activeOpacity={0.8}
                onPress={() => this.onPress(READING_REPO)}
            />
        );*/
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    title="关于我们"
                    leftIcon="ios-arrow-back"
                    leftPress={()=>{this.props.navigator.pop()}}
                />
                <View style={styles.content}>
                    <View style={styles.center}>
                        <Image
                            style={styles.logo}
                            source={aboutLogo}
                        />
                        <Text style={styles.title}>
                            iReading
                        </Text>
                        <Text style={styles.subtitle}>
                            让生活更精彩
                        </Text>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.disclaimerContent}>
                            <Text style={[styles.disclaimer, {color: '#999999'}]}>
                                免责声明：所有内容均来自:
                            </Text>

                            <Button
                                style={[styles.disclaimer, {color: '#3e9ce9'}]}
                                title={API_STORE}
                                onPress={() => this.onPress(API_STORE)}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 10
    },
    center: {
        flex: 1,
        alignItems: 'center'
    },
    logo: {
        width: 110,
        height: 110,
        marginTop: 50
    },
    version: {
        fontSize: 16,
        textAlign: 'center',
        color: '#aaaaaa',
        marginTop: 5
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        color: '#313131',
        marginTop: 10
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        color: '#4e4e4e'
    },
    disclaimerContent: {
        flexDirection: 'column'
    },
    disclaimer: {
        fontSize: 14,
        textAlign: 'center'
    },
    bottomContainer: {
        alignItems: 'center'
    }
});

export default About;
