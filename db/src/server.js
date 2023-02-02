import express from 'express';
import {server_env} from './config/system.config.js';
import all_types_data from './routes/all_type.routes.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded())

// app.use('/api/v1/',all_types_data)(app);
all_types_data(app);

// Connect database
mongoose.connect(server_env.mongo_url, () => console.log('Database connected'));

app.listen(server_env.port, () => {
    console.log(`Server listen on port ${server_env.port}`);
})