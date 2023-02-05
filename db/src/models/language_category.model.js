import mongoose from 'mongoose';

const Language_category = new mongoose.Schema({
    language: {
        type: String,
    },
    status: {
        type: Number,
        default: 0
    },
    createAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now();
        }
    },
    updateAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    },
    deletedAt: {
        type: String,
        default: 0,
    }
});

export default mongoose.model('language_category', Language_category);