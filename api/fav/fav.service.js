const Fav = require('./fav.model');

const createFav = (data) => Fav.create(data);
const findFavById = (id) => Fav.findById(id);
const updateFavById = (id, data) => Fav.findByIdAndUpdate(id, data, { returnDocument: 'after' });
const deleteFavById = (id) => Fav.findByIdAndRemove(id);

module.exports = {
    createFav,
    findFavById,
    updateFavById,
    deleteFavById
}
