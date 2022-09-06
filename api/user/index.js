const { Router } = require('express');

const { createUserHandler, loginUserHandler } = require('./user.controller.js')

const router = Router();


router.post('/', createUserHandler);
router.post('/login', loginUserHandler);

module.exports = router;
