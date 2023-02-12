
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
        return res.status(500).send({status: false, message: 'failure', data: err.message});
    }
}

export {Post_docs}