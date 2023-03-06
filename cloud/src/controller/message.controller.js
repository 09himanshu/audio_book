import {publish} from '../utils/aws.connection.js';

const publish_sms = async (req, res) => {
    let {message, phoneNumber} = req.body;
    // console.log('==========================',message, phoneNumber)
    try {
        let data = await publish(message,phoneNumber);
        res.status(201).send({status: true, messgae: 'SUCCESS', data: data});
    } catch (err) {
        console.log(err);
        res.status(500).send({status: false, message: 'FAILURE', data: `Some internal error occur`});
    }
}

export {publish_sms};