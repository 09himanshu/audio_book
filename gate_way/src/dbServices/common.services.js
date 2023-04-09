import axios from 'axios';
import {server_env} from '../config/system.config.js'
import {call_api} from '../utils/service_calling.util.js';

let headers = {'Content-Type': 'application/json'}

const insert = async (collection, obj) => {

    let url;
    (process.env.NODE_ENV == 'production') ? url = `${server_env.http}${server_env.host}:${server_env.db_service_port}/api/v1/audio_book/${collection}` :
    url = `${server_env.http}${server_env.host}:${server_env.db_service_port}/api/v1/audio_book/${collection}`;

    try {
        let data = await call_api(url,headers,'post',obj);
        return data;
    } catch (err) {
        console.log(err.message);
    }
}

const get_all = async (collection) => {
    let url;
    try {
        (process.env.NODE_ENV == 'production') ? url = `${server_env.http}${server_env.host}:${server_env.db_service_port}/api/v1/audio_book/${collection}`: 
        url = `${server_env.http}${server_env.host}:${server_env.db_service_port}/api/v1/audio_book/${collection}`;

        let data = await call_api(url,null);
        return data;
    } catch (err) {
        console.log(err);
    }
}

const findAll = async ({collection, queryFilter}) => {
    let url;

    try {
        (process.env.NODE_ENV == 'production') ? url = `${server_env.http}${server_env.host}:${server_env.db_service_port}/api/v1/audio_book/${collection}?${queryFilter}` : 
        url = `${server_env.http}${server_env.host}:${server_env.db_service_port}/api/v1/audio_book/${collection}?${queryFilter}`;

        let data = await call_api(url);
        return data;
    } catch (e) {
        console.log(e);
    }
}

const updateOne = async ({collection, queryFilter, document}) => {
    let url;
    try {
        (process.env.NODE_ENV == 'production') ? url = `${server_env.http}${server_env.host}:${server_env.db_service_port}/api/v1/audio_book/${collection}?${queryFilter}` :
        url = `${server_env.http}${server_env.host}:${server_env.db_service_port}/api/v1/audio_book/${collection}?${queryFilter}`

        let data = await call_api(url, headers, 'put', document);
        return data;

    } catch (err) {
        console.log(err);
    }
}

const publish_sms = async (body) => {
    try {
        let url = `${server_env.http}${server_env.host}:${server_env.cloud_service}/api/v1/cloud/publish_sms`;
        let data = await call_api(url,headers,'post',body);
        return data;
    } catch (err) {
        console.log(err);
    }
}

export {insert,get_all, publish_sms, findAll, updateOne};



