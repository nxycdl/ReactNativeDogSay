/**
 * Created by dl on 2017-04-16.
 */
import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';
let storage = new Storage({
    size: 1000,
    defaultExpires: null,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24 * 7,
    enableCache: true,
})
global.storage = storage;