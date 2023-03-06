import {collections} from '../utils/constant.utils.js';
import * as Function from '../dbServices/common.services.js';
import {generateOTP} from '../utils/otp.generator.js';
import * as Util_Function from '../utils/function.util.js';


const registration = async (req, res) => {
    let body = req.body;
    try {
        const hrstart = process.hrtime();

        let otp = await generateOTP();
        body.otp = otp;
        let receive_data = await Function.insert(collections.USERS, body);
        await Util_Function.send_sms(`<#>This is your onr time password ${body.otp}`, body.phone);

        const hrend = process.hrtime(hrstart); 
        global.$log('post', '', req.url, `${hrend[1]/1000000}`);

        res.status(201).send(receive_data);
    } catch (err) {
        console.log(err);
        res.status(500).send({status: false, message: 'FAILURE', data: `Some INternal Error occur ${err.message}`})
    }
}

export {registration};