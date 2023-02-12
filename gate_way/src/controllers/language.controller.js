import {insert} from '../dbServices/common.services.js';
import {collections} from '../utils/constant.utils.js'

const language_ = async (req, res) => {
    let body = req.body;
    try {
        let data = await insert(collections.LANGUAGE, body);
        console.log(data);

        res.status(201).send({status: true, message: `success`.toUpperCase(), data: data});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({status: false, message: `failure`.toUpperCase(), data: `Some error occur ${err.message}`});
    }
}

export {language_}