const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    listsFavs: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'ListFav'
        }
    ]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
