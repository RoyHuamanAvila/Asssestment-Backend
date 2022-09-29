const {
    createFav,
    findFavById,
    updateFavById,
    deleteFavById
} = require('./fav.service');

const { findSingleListById, updateListById } = require('../listFavs/listFavs.service');

const createFavHandler = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const listToAdd = await findSingleListById(id);
        if (!listToAdd) return res.status(404).json({ message: 'List to add not found' });

        const newFav = await createFav({ ...data, listFav: id });
        const listUpdated = await updateListById(id, {
            $push: {
                collectionFavs: newFav._id
            }
        });

        return res.status(201).json({ succes: 'New Fav Create', newFav, listUpdated });
    } catch (error) {
        return res.status(500).json(error);
    }
}

const findFavByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const favFound = await findFavById(id);

        if (!favFound) return res.status(404).json({ message: 'Fav not found' });

        return res.status(201).json(favFound);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const updateFavByIdHandler = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const favFound = await findFavById(id);
        if (!favFound) return res.status(404).json({ message: 'Fav not found' });

        const favUpdated = await updateFavById(id, data);
        return res.status(201).json(favUpdated);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteFavByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const favFound = await findFavById(id);
        if (!favFound) return res.status(404).json({ message: 'Fav not found' });

        const listFav = await updateListById(favFound.listFav, {
            $pull: {
                collectionFavs: id
            }
        });

        const favDeleted = await deleteFavById(id);

        return res.status(201).json({ message: 'Fav eliminated', favDeleted });
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    createFavHandler,
    findFavByIdHandler,
    updateFavByIdHandler,
    deleteFavByIdHandler
}
