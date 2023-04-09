import {AWS_CLASS} from './AWS.utils.js';
import {aws_config} from '../config/aws.config.js';

const aws = new AWS_CLASS(aws_config);

const sns = aws.SNS();

const publish = async (message, phoneNumber) => {
    try {
        await sns.setSMSAttributes({attributes: {
            DefaultSMSType: 'Transactional',
            DeliveryStatusSuccessSamplingRate: '100',
            DeliveryStatusIAMRole: 'arn:aws:iam::179154069528:role/SNS_service'
        }}).promise();
        
        let receive_data = await sns.publish({
            Message: message,
            PhoneNumber: phoneNumber,
        }).promise();

        // let data = await sns.subscribe({
        //     Protocol: 'sms',
        //     TopicArn: 'arn:aws:sns:ap-south-1:179154069528:my_sns_service',
        //     Endpoint: '+918420400540'
        // }).promise();
        // console.log(data);

        await sns.getSMSAttributes({attributes: ['DeliveryStatusIAMRole']}).promise();
        // console.log(getsmsAt);
        return receive_data;
    } catch (err) {
        console.log(err.message);
    }
}

export { publish }
