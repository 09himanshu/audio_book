import {server_env} from '../config/system.config.js';
import {call_api} from './service_calling.util.js';

let headers = {'Content-Type': 'application/json'}


const send_sms = async (message, phoneNumber) => {
    let url = `${server_env.http}${server_env.host}:${server_env.cloud_service}/api/v1/cloud/publish_sms`;
    try {
        let body = {message,phoneNumber}
        let data = await call_api(url,headers,'post',body);
        return data;
    } catch (err) {
        console.log(err);
    }
}

export {send_sms}