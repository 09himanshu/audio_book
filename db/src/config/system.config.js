import dotenv from 'dotenv';
dotenv.config();

const server_env = {
    port: process.env.port,
    mongo_url: process.env.mongo_url,
    db_name: process.env.db_name
}

export {server_env}
// export default {server_env}