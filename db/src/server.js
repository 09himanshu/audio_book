import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import {server_env} from './config/system.config.js';
import all_types_data from './routes/all_type.routes.js';
import {deleteOldLogs, logEvent} from './utils/audit_logs.util.js';
import {DB} from './services/db_services.js'

main();

async function main() {

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(morgan('dev'));

    // =========>>>>>>>> Audit Log 
    global.$log = logEvent;
    
    // ===========>>>>>>>>> Database Connection
    global.db_services = new DB(server_env.db_name);
    await global.db_services._ensureConnection();

    // ===========>>>>>>>>> Routes for all apis
    all_types_data(app);

    // ===========>>>>>>>>> Schedule the deletion of old logs
    setInterval(deleteOldLogs, 24 * 60 * 60 * 1000);

    // ===========>>>>>>>>> Start server
    start(app, server_env);
}

async function start (app,server_env) {
    try {
        app.listen(server_env.port, () => {
            console.log(`============>>>>>>>>Server listen on port ${server_env.port}<<<<<<<<=============`);
        });
    } catch (err) {
        throw new Error(err);
    }

}
