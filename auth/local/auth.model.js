const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'The user require a email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The user require a password'],
        validate: {
            validator: function (val) {
                return val.length >= 6
            },
            message: () => 'Password must be at least 12 characters long'
        },
    },
    listsFavs: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'ListFav'
        }
    ]
}, { timestamps: true });


const User = mongoose.model('User', UserSchema);
module.exports = User;
