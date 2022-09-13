const mongoose = require('mongoose');
const { Schema } = mongoose;

const ListFavSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    collectionFavs: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Fav'
        }
    ]
});

const ListFav = mongoose.model('ListFav', ListFavSchema);
module.exports = ListFav;
