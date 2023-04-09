import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';

import {server_env}  from './config/system.config.js';
import {deleteOldLogs,logEvent} from './utils/audit_log.utils.js';
import language from './routes/language.routes.js';
import auth from './routes/auth.routes.js';

main();

async function main() {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(helmet());
    app.use(morgan('dev'));

    const env = server_env;

    // Audit logs
    global.$log = logEvent;
    deleteOldLogs();

    // routes
    language(app);
    auth(app);

    start(app,env);
}

async function start(app, env) {
    try {
        app.listen(env.port, () => {
            console.log(`===========>>>>>>>>>> Server Started on port ${env.port} <<<<<<<=========`);
        })
    } catch (err) {
        throw new Error(err)
    }
}