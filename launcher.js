/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    AsyncStorage
} from 'react-native';

import rootApp from './src/root';
import Store from './src/util/MyStorage'

/*
import Storage from 'react-native-storage';
let storage = new Storage({
    size: 1000,
    defaultExpires: null,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24 * 7,
    enableCache: true,
})
global.storage = storage;*/

AppRegistry.registerComponent('ReactNativeDogSay', () => rootApp);
