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
import NavBar from '../component/NavBar';
import Item from '../component/Item';
import Wrapper from '../component/Wrapper';
import {USERINFO} from '../util/GlobalType';
import ChangePwdPage from '../pages/ChangePwdPage';
export default class UserProfile extends Component {
    constructor(props) {
        super(props)

    }

    back() {
        this.props.navigator.pop()
    }


    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <NavBar
                    title="个人信息"
                    leftIcon="ios-arrow-back"
                    leftPress={this.back.bind(this)}
                />
                <ScrollView>
                    <Item name="姓名" first={true} subName ={global.userInfo.name} />
                    <Item name="身份证号" subName ={global.userInfo.sfzh}/>
                    <Item name="参加工作时间" subName ={global.userInfo.cjgzsj}/>
                    {global.userInfo.grsf?<Item name="个人身份" first={true} subName ={global.userInfo.grsf} /> :null}
                    <Item name="现任职务" subName ={global.userInfo.xrzw} />
                    <Item name="现任职务时间"subName ={global.userInfo.xrzwsj} />
                    <Item name="进入本单位时间" subName ={global.userInfo.jrbdwsj}/>
                    <Item name="聘任时间" subName ={global.userInfo.pzsj}/>
                    {global.userInfo.rdsj?<Item name="入党时间" subName ={global.userInfo.rdsj} /> :null}
                    {global.userInfo.bz?<Item name="备注" subName ={global.userInfo.bz} /> :null}

                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({})