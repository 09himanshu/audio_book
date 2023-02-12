import mongoose from "mongoose";
import * as Model from '../models/index.js';
import {errorMessage, successMessage} from '../utils/return_err_messgae.js'

class DB {
    #db_name;
    #connection_names = [];

    constructor(db_name) {
        if(!db_name) throw new Error('Port number is missing');

        this.#db_name = db_name;
    }

    async _ensureConnection() {
        let url = `mongodb://localhost/${this.#db_name}`;

        mongoose.connect(url);

        const connection = mongoose.connection;
        connection.on('error', console.error.bind(console, 'MongoDB database connection failed'));
        connection.once('open', async () => {
            console.log(' ---------->>>>>>> MongoDB database connection established successfully <<<<<<<<---------');
            this.#connection_names = await connection.db.listCollections().toArray();
            // console.log(this.#connection_names);
        });
    }

    async find(collection, filter, projection) {
        try {
            await this._ensureConnection();

            if(!this.#connection_names.includes(collection)) return {status: false, message: 'failure'.toUpperCase(), data: `Invalid collections name`};

            const data = await Model[collection].find(filter || {}, projection || {});
            return await successMessage(data);
        } catch (err) {
            return await errorMessage(err);
        }
    }

    async insert(collection, document) {
        try {
            await this._ensureConnection();
            const data = await Model[collection].create({...document});
            return await successMessage(data);
        } catch (err) {
            return await errorMessage(err);
        }
    }

    async updateOne(collection, filter, document) {
        let copy = {...document};
        delete copy._id;
        await this._ensureConnection();

        try {
            let data = await Model[collection].updateOne(filter, {$set: {...copy} } );
            return await successMessage(data);
        } catch (err) {
            return await errorMessage(err);
        }
    }

    async updateMany(collection, filter, document) {
        let copy = {...document};
        delete copy._id;
        await this._ensureConnection();

        try {
            let data = await Model[collection].updateMany(filter, {$set: {...copy} } );
            return await successMessage(data);
        } catch (err) {
            return await errorMessage(err);
        }
    }

    async deleteOne (collection, filter) {
        try {
            await this._ensureConnection();
            let data = await Model[collection].deleteOne(filter);
            return await successMessage(data);
        } catch (err) {
            return await errorMessage(err);
        }
    }

    async deleteMany (collection, filter) {
        try {
            await this._ensureConnection();
            let data = await Model[collection].deleteMany(filter);
            return await successMessage(data);
        } catch (err) {
            return await errorMessage(err);
        }
    }
}

export {DB}