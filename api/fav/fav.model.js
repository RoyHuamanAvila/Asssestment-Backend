const { default: mongoose, Schema } = require('mongoose');

const FavSchema = new Schema({
    listFav: {
        type: mongoose.Types.ObjectId,
        ref: 'ListFav'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Fav = mongoose.model('Fav', FavSchema);
module.exports = Fav;
