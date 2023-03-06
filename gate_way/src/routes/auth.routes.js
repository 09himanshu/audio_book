import * as Controller from '../controllers/auth.controller.js';

export default async function (app) {
    app.post('/api/v1/gate_way/user_registration',Controller.registration);
}