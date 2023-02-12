import axios from 'axios';
import {server_env} from '../config/system.config.js'

const insert = async (collection, obj) => {
    let url;
    (process.env.NODE_ENV == 'production') ? url = `${server_env.http}${server_env.host}:${server_env.db_service_port}/api/v1/audio_book/${collection}` :
    url = `${server_env.http}${server_env.host}:${server_env.db_service_port}/api/v1/audio_book/${collection}`;

    try {
        let data = await axios.post(url,obj);
        return data;
    } catch (err) {
        console.log(err.message);
    }
}

export {insert};