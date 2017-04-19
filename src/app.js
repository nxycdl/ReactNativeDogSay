import React, {Component} from 'react'
import {Navigator, View, StatusBar, Platform, BackAndroid} from 'react-native'
import Wrapper from './component/Wrapper'
export default class app extends Component {
    constructor(props) {
        super(props)
    }

    onBackAndroid = () => {
        if (this.refs.nav) {
            const nav = this.refs.nav;
            const routers = nav.getCurrentRoutes();
            if (routers.length > 1) {
                nav.pop();
                return true;
            }
            return false;
        }else{
            return true;
        }

    };

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    render() {

        return Platform.OS == "ios" ? (
            <Navigator
                initialRoute={{component: Wrapper}}
                configureScene={() => Navigator.SceneConfigs.FloatFromRight}
                renderScene={(route, navigator) => {
                    return <route.component navigator={navigator} {...route.args}/>
                }
                }
                ref="nav"
            />
        ) : (
            <View style={{flex: 1}}>
                <StatusBar
                    backgroundColor="#0398ff"
                    barStyle="light-content"
                />
                <Navigator
                    initialRoute={{component: Wrapper}}
                    configureScene={() => Navigator.SceneConfigs.FloatFromRight}
                    renderScene={(route, navigator) => {
                        return <route.component navigator={navigator} {...route.args}/>
                    }
                    }
                    ref="nav"
                />
            </View>
        )
    }
}
