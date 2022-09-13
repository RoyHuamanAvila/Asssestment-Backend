const {
    findAllLists,
    findSingleList,
    createList,
    deleteList
} = require('./listFavs.service');

const {
    updateUser
} = require('../auth/local/auth.service')

const findSingleListHandler = async (req, res) => {
    const user = req.user;
    const { id } = req.params;

    if (!user) return res.status(404).json({ message: 'User not found' });

    try {
        const list = await findSingleList({ user: user._id, _id: id });
        if (!list) return res.status(404).json({ message: 'List not found' });
        return res.status(201).json(list);
    } catch (error) {
        return res.status(500).json({ error });
    }

}

const findAllListsHandler = async (req, res) => {
    const user = req.user;

    if (!user) return res.status(404).json({ message: 'User not found' });

    try {
        const { _id } = user;
        const listFavs = await findAllLists({ user: _id });
        if (!listFavs) return res.status(404).json({ message: 'Lists not found' });
        return res.status(201).json({ listFavs });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const createListHandler = async (req, res) => {
    const user = req.user;
    const { name } = req.body;
    if (!user) return res.status(404).json({ message: 'User not found' });

    try {
        const { _id, email } = user;
        const newList = await createList({ user: _id, name });
        const userUpdated = await updateUser(user._id, {
            $push: {
                listsFavs: newList._id
            }
        })
        return res.status(201).json({ userUpdated, newList });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const deleteListHandler = async (req, res) => {
    const user = req.user;
    const { id } = req.params;

    if (!user) return res.status(404).json({ message: 'User not found' });

    try {
        const deletedList = await deleteList({ _id: id });
        const userUpdated = await updateUser(user._id, {
            $pull: { listsFavs: id }
        })

        if (!deletedList) return res.status(404).json({ message: 'List not found' });
        return res.status(201).json({ message: 'List removed', deletedList });
    } catch (error) {
        return res.status(500).json({ error });
    }

}

module.exports = {
    createListHandler,
    findAllListsHandler,
    findSingleListHandler,
    deleteListHandler
}
