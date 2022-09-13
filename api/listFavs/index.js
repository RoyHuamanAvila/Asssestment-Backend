const { Router } = require('express');
const router = Router();

const {
    createListHandler,
    findAllListsHandler,
    findSingleListHandler,
    deleteListHandler
} = require('./listFavs.controller.js');

router.get('/', findAllListsHandler);
router.get('/:id', findSingleListHandler);
router.post('/', createListHandler);
router.delete('/:id', deleteListHandler);
module.exports = router;
