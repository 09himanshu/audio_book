import * as Model from '../models/index.js';

const Post_docs = async (req, res) => {
    let colletion = req.params.collection_name;
    let body = req.body;
    try {
        // Read the collection name from url and perform the crud operation
        await Model[colletion].create(body);
        return res.status(201).send({status: true, message: 'success', data: `Language is added to Database`});
    } catch (err) {
        console.log(err);
        return res.status(500).send({status: false, message: 'failure', data: err.message});
    }
}

export {Post_docs}