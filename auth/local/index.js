const { Router } = require('express');

const { createUserHandler, loginUserHandler } = require('./auth.controller.js')

const router = Router();


router.post('/register', createUserHandler);
router.post('/login', loginUserHandler);

module.exports = router;
