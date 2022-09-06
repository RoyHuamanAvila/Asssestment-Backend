const { createUser, findUserByEmail } = require('./user.service.js');
const bcryptjs = require('bcryptjs');

const createUserHandler = async (req, res) => {
    const { email, password } = req.body;

    try {
        const findUser = await findUserByEmail(email);
        if (findUser) return res.status(404).json({ message: 'Email already in use' })
        const passwordInput = bcryptjs.hash(password, 8);
        const newUser = await createUser({ email, passwordInput });
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ message: 'error' });
    }
}

const loginUserHandler = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await findUserByEmail(email);
        if (!user) return res.status(404).json({ message: 'Wrong data' });

        const passwordHash = await bcryptjs.hash(password, 8);
        const comparePassword = await bcryptjs.compare(passwordHash, user.password)

        if (!comparePassword) return res.status(404).json({ message: 'Wrong data' });


    } catch (error) {
        return res.status(500).json({ message: 'error' });
    }
}

module.exports = {
    createUserHandler,
    loginUserHandler
}
