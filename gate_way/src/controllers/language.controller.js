import * as Function from '../dbServices/common.services.js';
import {collections} from '../utils/constant.utils.js';


const language_ = async (req, res) => {
    let body = req.body;
    try {
        const hrstart = process.hrtime();
        let data = await Function.insert(collections.LANGUAGE, body);

        const hrend = process.hrtime(hrstart); 
        global.$log('post', '', req.url, `${hrend[1]/1000000}`);
        res.status(201).send({data: data});
    } catch (err) {
        console.log(err);
        res.status(500).send({status: false, message: `failure`.toUpperCase(), data: `Some error occur ${err.message}`});
    }
}

const get_list_language = async (req, res) => {
    try {
        const hrstart = process.hrtime();
        let data = await Function.get_all(collections.LANGUAGE);
        const hrend = process.hrtime(hrstart); 
        global.$log('get', '', req.url, `${hrend[1]/1000000}`);
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send({status: false, message: 'failure'.toUpperCase(), data: `Internal server error occur ${err.message}`});
    }
}

export {language_,get_list_language}