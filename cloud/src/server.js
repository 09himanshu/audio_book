import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import {hiddendata} from './config/system.config.js';
import {deleteOldLogs, logEvent} from './utils/audit_log.utils.js'
import sms from './routes/sms.routes.js';

async function main() {
    const app = express();
    const env = hiddendata;

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(morgan('dev'))

    // Audit logs
    global.$log = logEvent;
    deleteOldLogs();

    sms(app);

    start(app,env);
}

main();

function start (app,env) {
    try {
        app.listen(env.port, () => {
            console.log(`>>>>>>>>>>>Server listen on port ${env.port}<<<<<<<<<<<<<`);
        });
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}