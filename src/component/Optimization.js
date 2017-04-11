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
    TextInput,
    Dimensions
} from 'react-native'

import {Button as EButton, ListItem, CheckBox} from 'react-native-elements'
import {SocialIcon} from 'react-native-elements'
import px2dp from '../util'
import Button from './Button'
import {Isao} from 'react-native-textinput-effects';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
const isIOS = Platform.OS == "ios"
const { width, height } = Dimensions.get('window')
import _ from 'lodash';
/**
 * 优化改进意见;
 */
export default class Optimization extends Component {


    constructor(props) {
        super(props)
        this.state = {
            tag: 0,
            textInputHeight: 30,
            maxUploadImage: 10,
            avatarSourceList: [],
            avatarSource: ''
        }
    }

    componentWillMount() {
        this.setState({tag: 1});
    }

    textInputOnChange(event) {
        let height = 0;
        if (event.nativeEvent.contentSize.height > 30) {//此处是判断 是否大于我设置的input默认高度，如果大于则使用input的内容高度
            height = event.nativeEvent.contentSize.height;//内容高度
        } else {
            height = this.state.height;
        }
        this.setState({
                textInputHeight: height
            }
        );
    }

    showImagePicker(event) {
        var _this = event;
        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */

        /**
         * 摄像机默认属性;
         * @type {{title: string, customButtons: [*], storageOptions: {skipBackup: boolean, path: string}}}
         */
        var options = {
            title: '',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '从相册选择',
            storageOptions: {
                skipBackup: false,
                path: 'images'
            }
        };


        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = {uri: response.uri};
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                //var list = _this.state.avatarSourceList.push(source);
                this.setState({
                    avatarSource: source
                });

                var avatarSourceList = this.state.avatarSourceList;
                avatarSourceList.push(source);
                this.setState({
                    avatarSourceList: avatarSourceList
                });
            }
        });
    }

    _removeImage(item) {
        var avatarSourceList = this.state.avatarSourceList;
        console.log('x');
        _.remove(avatarSourceList, item);
        this.setState({
            avatarSourceList: avatarSourceList
        });
    }

    _renderImageItem(item, i) {
        return (<View key={i} style={styles.imglist}>
                <Image source={item} style={styles.uploadAvatar}/>
                <Text style={styles.remove} onPress={this._removeImage.bind(this, item)}><Icon name="times"
                                                                                               color="#4F8EF7"
                                                                                               size={px2dp(26)}/></Text>
            </View>
        )
    }

    _renderImageList() {
        if (this.state.avatarSourceList.length > 0) {
            return this.state.avatarSourceList.map((item, i) => this._renderImageItem(item, i));
        }
        //return
    }


    render() {
        return (
            <ScrollView>
                <View style={{flex: 1, marginBottom: 60}}>
                    <ListItem titleStyle={{fontSize: px2dp(13)}}
                              title="你好11"
                    />
                    <View style={[styles.item, {alignItems: "center"}]}>
                        <Text style={{fontSize: px2dp(13), color: "#222", minWidth: 45, marginLeft: 20}}>{"类型"}</Text>
                        <View style={{flexDirection: "row", flex: 1}}>
                            <Button style={{marginLeft: 10}} onPress={() => {
                                this.setState({tag: 0})
                            }}>
                                <Text style={[styles.radio, this.state.tag === 0 ? styles.active : null]}>{"意见"}</Text>
                            </Button>
                            <Button style={{marginLeft: 10}} onPress={() => {
                                this.setState({tag: 1})
                            }}>
                                <Text style={[styles.radio, this.state.tag === 1 ? styles.active : null]}>{"BUG"}</Text>
                            </Button>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.label}>{"门牌号"}</Text>
                        <View style={{flex: 1}}>
                            <TextInput numberOfLines={4}
                                       multiline={true}
                                       underlineColorAndroid="transparent"
                                // style={[styles.textInput, styles.textInputBorder,{height:this.state.textInputHeight}]}
                                       style={[{height: this.state.textInputHeight}, styles.textInputBorder]}
                                       placeholder="请输入您的意见"
                                       placeholderTextColor="#aaa" onChange={this.textInputOnChange.bind(this)}/>
                        </View>
                    </View>
                    <ListItem titleStyle={{fontSize: px2dp(13)}}
                              plus
                              title="图片上传"
                              rightTitle={this.state.avatarSourceList.length + '/' + this.state.maxUploadImage}
                              rightTitleStyle={{color: 'red'}}
                              onPress={this.showImagePicker.bind(this)}
                              rightIcon={{name: 'add', color: '#397af8'}}
                    />
                    <View style={{alignItems: "center"}}>
                        {this._renderImageList()}
                        {/*<Image source={this.state.avatarSourceList[1]} style={styles.uploadAvatar}/>*/}


                    </View>
                    <EButton buttonStyle={styles.button}
                             title='提交' onPress={this.showImagePicker.bind(this)}/>
                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#397af8',
        borderRadius: 25,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 0,
        marginTop: 10
    },
    item: {
        borderBottomWidth: 1,
        borderBottomColor: "#f8f8f8",
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between"
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
    textInput: {
        flex: 1,
        paddingVertical: 0,
        fontSize: px2dp(13),
        paddingHorizontal: 10
    },
    textInputBorder: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        color: "#666",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        fontSize: px2dp(13),
        backgroundColor: "#fff",
        borderColor: "#81c2ff",
    },
    label: {
        marginLeft: 20,
        minWidth: 45,
        fontSize: px2dp(13),
        color: "#222",
        paddingTop: 8
    },
    uploadAvatar: {
        justifyContent: "center",
        width: width -50 ,
        height: width- 50
    },
    remove: {
        position: 'absolute',
        right: 0,
        bottom: 0
    },
    imglist :{
        marginTop:20,
        borderBottomWidth: 1,
        borderBottomColor:'red'
    }

})