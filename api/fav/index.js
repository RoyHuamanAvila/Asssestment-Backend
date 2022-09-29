const { Router } = require('express');
const { createFavHandler, findFavByIdHandler, updateFavByIdHandler, deleteFavByIdHandler } = require('./fav.controller')

const router = Router();

router.post('/:id', createFavHandler);
router.get('/:id', findFavByIdHandler);
router.patch('/:id', updateFavByIdHandler);
router.delete('/:id', deleteFavByIdHandler);

module.exports = router;
