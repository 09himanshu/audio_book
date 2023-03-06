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
    }
})

export default mongoose.model('user', User);