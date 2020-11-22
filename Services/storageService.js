import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
// const AsyncStorage = require('@react-native-async-storage/async-storage'),
// moment = require('moment');
export async function setItem(key, value) {
    var data = {
        data: value,
        ttl: moment().add(1,'days').valueOf()
    }
    await AsyncStorage.setItem(key, JSON.stringify(data));
}

export async function getItem(key) {
    var value = await AsyncStorage.getItem(key)
    value = value ? JSON.parse(value) : null;
    if(value && value.ttl < moment().valueOf()) {
        await AsyncStorage.removeItem(key);
        return null;
    } else {
        return value ? value.data : value;
    }
}

export async function removeItem(key) {
    await AsyncStorage.removeItem(key);
}