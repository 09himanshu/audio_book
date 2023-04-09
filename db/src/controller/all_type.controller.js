
import {queryStringToMongoDB} from '../utils/operators.utils.js'

const Post_docs = async (req, res) => {
    let colletion = req.params.collection_name;
    let body = req.body;
    try {
        const hrstart = process.hrtime();
        let receive_data = await global.db_services.insert(colletion, body);
        const hrend = process.hrtime(hrstart); 
        global.$log('post', '', req.url, `${hrend[1]/1000000}`);
        return res.status(201).send(receive_data);
    } catch (err) {
        console.log(err);
        return res.status(500).send({status: false, message: 'FAILURE', data: `Internal server error ${err.message}`});
    }
}

const get_docs = async (req, res) => {
    let colletion = req.params.collection_name;
    try {
        const hrstart = process.hrtime();
        let data = await queryStringToMongoDB(req.url);
        let receive_data = await global.db_services.find(colletion,data.query,{}, data.options);
        const hrend = process.hrtime(hrstart); 
        global.$log('post', '', req.url, `${hrend[1]/1000000}`);
        return res.status(201).send(receive_data);
    } catch (err) {
        console.log(err);
        return res.status(500).send({status: false, message: `FAILURE`, data: `Internal server error ${err.message}`})
    }
}

const update_docs = async (req, res) => {
    let colletion = req.params.collection_name;
    let body = req.body;
    try {
        const hrstart = process.hrtime();
        let data = await queryStringToMongoDB(req.url);
        let receive_data = await global.db_services.updateOne(colletion, data.query, body);
        const hrend = process.hrtime(hrstart); 
        global.$log('put', '', req.url, `${hrend[1]/1000000}`);
        return res.status(200).send(receive_data);
    } catch (err) {
        console.log(err);
        return res.status(500).send({status: false, message: `FAILURE`, data: `Internal server error :( `});
    }
}

export {Post_docs,get_docs,update_docs}