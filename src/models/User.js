import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: Array,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    userType: {
        type: String,
        required: true,
        default: 'Client',
        enum: ['Admin', 'Driver', 'Client', 'Vendor'],
    },
    profile: {
        type: String,
        required: true,
        default: 'https://i.stack.imgur.com/l60Hf.png',
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', UserSchema);

export default User;