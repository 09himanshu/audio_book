import {collections} from '../utils/constant.utils.js';
import * as Function from '../dbServices/common.services.js';
import {generateOTP} from '../utils/otp.generator.js';
import * as Util_Function from '../utils/function.util.js';
import {server_env} from '../config/system.config.js'
import jwt from 'jsonwebtoken';


const registration = async (req, res) => {
    let body = req.body;
    try {
        const hrstart = process.hrtime();

        let query = {collection: collections.USERS, queryFilter: `phone=${body.phone}`}
        let check_user = await Function.findAll(query);
        let otp = await generateOTP();

        if (check_user.data.length) {
            
            if (check_user.data.activeSession != 1) {
                const token = jwt.sign({id: check_user.data[0]._id},server_env.jwt_secret_key, {expiresIn: 500} );
                let query = {collection: collections.USERS, queryFilter: `phone=${body.phone}`, document: {activeSession: 1, otp: otp} };
                await Function.updateOne(query);
                await Util_Function.send_sms(`<#>This is your one time password ${otp}`, body.phone);
                return res.status(200).send({status: true, message: 'SUCCESS', data: `Login`, token: token});
            } else {
                const token = jwt.sign({id: check_user.data[0]._id},server_env.jwt_secret_key, {expiresIn: 500} );
                return res.status(200).send({status: true, message: 'SUCCESS', data: 'Login', token})
            }
        }

        body.otp = otp;
        let receive_data = await Function.insert(collections.USERS, body);
        await Util_Function.send_sms(`<#>This is your onr time password ${body.otp}`, body.phone);
        const token = jwt.sign({id: receive_data.data._id},server_env.jwt_secret_key, {expiresIn: 500} );
        const hrend = process.hrtime(hrstart); 
        global.$log('post', '', req.url, `${hrend[1]/1000000}`);

        res.status(201).send(receive_data, token);
    } catch (err) {
        console.log(err);
        res.status(500).send({status: false, message: 'FAILURE', data: `Some INternal Error occur ${err.message}`})
    }
}

export {registration};