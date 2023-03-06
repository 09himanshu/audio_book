import dotenv from 'dotenv';
dotenv.config();

const server_env = {};

if(process.env.NODE_ENV !== 'production') {
    server_env.port = process.env.port;
    server_env.db_service_port = process.env.db_service_port;
    server_env.http = process.env.http;
    server_env.host = process.env.host;
    server_env.cloud_service = process.env.cloud_service;
} else {
    server_env.port = process.env.port;
    server_env.db_service_port = process.env.db_service_port;
    server_env.http = process.env.http;
    server_env.host = process.env.host;
    server_env.cloud_service = process.env.cloud_service;
}

export {server_env}