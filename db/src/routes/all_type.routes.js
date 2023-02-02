
import * as Controller from '../controller/all_type.controller.js';

export default async function (app) {
    app.post('/save_data_to_db', Controller.Post_docs);
}