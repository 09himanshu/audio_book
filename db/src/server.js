import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import {server_env} from './config/system.config.js';
import all_types_data from './routes/all_type.routes.js';
import {deleteOldLogs} from './utils/audit_logs.util.js'

// Express own middlewares
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Connect database
mongoose.connect(server_env.mongo_url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));


// Routes for all apis
all_types_data(app);


// Schedule the deletion of old logs
setInterval(deleteOldLogs, 24 * 60 * 60 * 1000);

app.listen(server_env.port, () => {
    console.log(`Server listen on port ${server_env.port}`);
});