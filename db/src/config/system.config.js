import dotenv from 'dotenv';
dotenv.config();

const server_env = {};

if(process.env.NODE_ENV !== 'production') {
    server_env.port = process.env.port;
    server_env.mongo_url = process.env.mongo_url;
    server_env.db_name = process.env.db_name;
} else {
    server_env.port = process.env.port;
    server_env.mongo_url = process.env.mongo_url;
    server_env.db_name = process.env.db_name;
}

export {server_env}
