const ListFav = require('./listFavs.model.js');

const findAllLists = (data) => ListFav.find(data);
const findSingleList = (data) => ListFav.findOne(data);
const findSingleListById = (id) => ListFav.findById(id);
const updateListById = (id, data) => ListFav.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' });
const createList = (data) => ListFav.create(data);
const deleteList = (data) => ListFav.findOneAndDelete(data);

module.exports = {
    findAllLists,
    findSingleList,
    findSingleListById,
    createList,
    updateListById,
    deleteList
}
