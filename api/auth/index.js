const { Router } = require('express');
const router = Router();

router.post('/auth/local/login', (req, res) => {
    const { email, password } = req.body;
});
