import AWS from 'aws-sdk';

export class AWS_CLASS {

    constructor(config) {
        this.region = config.region;
        this.AWS = AWS;
        this.AWS.config.update({ region: config.region, accessKeyId: config.key, secretAccessKey: config.secret });
    }

    S3() {
        return new this.AWS.S3({apiVersion: '2006-03-01'});
    }

    SNS() {
        return new this.AWS.SNS({apiVersion:'2010-03-31'});
    }
}