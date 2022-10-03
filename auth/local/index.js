const { Router } = require('express');

const { createUserHandler, loginUserHandler } = require('./auth.controller.js');
const { registerValidate } = require('./auth.joivalidate.js');

const router = Router();


router.post('/register', registerValidate, createUserHandler);
router.post('/login', loginUserHandler);

module.exports = router;
