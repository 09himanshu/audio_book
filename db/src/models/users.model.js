import mongoose from 'mongoose';

const User = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
    },
    languages: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'language_category'
    },
    country_code: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now();
        }
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    },
    deletedAt: {
        type: mongoose.Schema.Types.Mixed,
        default: '0'
    },
    activeSession: {
        type: Number,
        default: 1,
    }
})

export default mongoose.model('user', User);