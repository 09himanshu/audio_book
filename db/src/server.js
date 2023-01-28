import express from 'express';
import {server_env} from './config/system.config.js';
import mongoose from 'mongoose';

const app = express();


// Connect database
mongoose.connect(server_env.mongo_url, () => console.log('Database connected'));

app.listen(server_env.port, () => {
    console.log(`Server listen on port ${server_env.port}`);
})