import {hiddendata} from './system.config.js';

const aws_config = {
    key: hiddendata.key,
    secret: hiddendata.secret,
    region: hiddendata.region
}

export {aws_config};