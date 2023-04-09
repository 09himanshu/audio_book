import dotenv from 'dotenv';
dotenv.config();

const server_env = {};

if(process.env.NODE_ENV !== 'production') {
    server_env.port = process.env.port;
    server_env.db_service_port = process.env.db_service_port;
    server_env.http = process.env.http;
    server_env.host = process.env.host;
    server_env.cloud_service = process.env.cloud_service;
    server_env.jwt_secret_key = process.env.jwt_secret_key;
} else {
    server_env.port = process.env.port;
    server_env.db_service_port = process.env.db_service_port;
    server_env.http = process.env.http;
    server_env.host = process.env.host;
    server_env.cloud_service = process.env.cloud_service;
    server_env.jwt_secret_key = process.env.jwt_secret_key;
}

export {server_env}