import mongoose from 'mongoose';

const Language_category = new mongoose.Schema({
    language: {
        type: String,
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
    }
});

export default mongoose.model('language_category', Language_category);