import * as Controller from '../controller/message.controller.js';

export default async function (app) {
    app.post('/api/v1/cloud/publish_sms',Controller.publish_sms);
}
