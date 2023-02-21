import axios from 'axios';
import {server_env} from '../config/system.config.js'
import {call_api} from '../utils/service_calling.util.js';

let headers = {'Content-Type': 'application/json'}

const insert = async (collection, obj) => {
    console.log(obj);
    let url;
    (process.env.NODE_ENV == 'production') ? url = `${server_env.http}${server_env.host}:${server_env.db_service_port}/api/v1/audio_book/${collection}` :
    url = `${server_env.http}${server_env.host}:${server_env.db_service_port}/api/v1/audio_book/${collection}`;

    try {
        // let data = await axios.post(url,obj);
        let data = await call_api(url,headers,'post',obj);
        return data;
    } catch (err) {
        console.log(err.message);
    }
}

export {insert};



