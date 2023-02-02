
import * as Model from '../models/index.js';

const Post_docs = async (req, res) => {
    // Receiving th ecollection name from other services
    const colletion = req.query.collection;
    let body = req.body;
    try {
        // let post = await Model[colletion].create(body);
        let post = await Model.language_categoryModel.create(body);
        return res.status(201).send({status: true, message: 'success', data: post});
    } catch (err) {
        console.log(err);
        return res.status(500).send({status: false, message: 'failure', data: err.message});
    }
}

export {Post_docs}