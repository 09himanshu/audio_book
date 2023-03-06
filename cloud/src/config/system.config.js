import dotenv from 'dotenv';
dotenv.config();

const hiddendata = {
    port: process.env.port,
    host: process.env.host,
    key: process.env.key,
    secret: process.env.secret,
    region: process.env.region
}

export {hiddendata}