
import * as Controller from '../controller/all_type.controller.js';

export default async function (app) {
    app.post('/api/v1/audio_book/:collection_name', Controller.Post_docs);
}