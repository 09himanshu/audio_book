import dotenv from 'dotenv';
dotenv.config();

const server_env = {
    port: process.env.port,
    mongo_url: process.env.mongo_url
}

export {server_env}
// export default {server_env}