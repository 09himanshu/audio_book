import * as controller from '../controllers/language.controller.js';

export default async function (app) {
    app.post('/api/v1/gate_way/create_language', controller.language_);
    app.get('/api/v1/gate_way/get_all_language',controller.get_list_language);
}