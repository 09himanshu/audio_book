import mongoose from 'mongoose';

const Audio_Title_category = new mongoose.Schema({
    name: {
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

export default mongoose.model('audio_title_category', Audio_Title_category);