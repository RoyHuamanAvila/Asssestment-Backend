const { createUser, findUserByEmail } = require('./auth.service.js');
const jwt = require('jsonwebtoken');

const bcryptjs = require('bcryptjs');

const createUserHandler = async (req, res) => {
    const { email, password } = req.body;

    try {
        const findUser = await findUserByEmail(email);
        if (findUser) return res.status(404).json({ message: 'Email already in use' })

        const passwordInput = await bcryptjs.hash(password, 8);
        const newUser = await createUser({ email, password: passwordInput });
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

        const comparePassword = await bcryptjs.compare(password, user.password)

        if (!comparePassword) return res.status(404).json({ message: 'Wrong data' });

        const token = jwt.sign({ email }, 'Make_It_Real', { expiresIn: '1h' });

        return res.status(201).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'error' });
    }
}

const isAuthenticated = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    try {
        if (typeof bearerHeader !== 'undefined') {
            const token = bearerHeader.split(' ')[1];

            const data = jwt.verify(token, 'Make_It_Real');

            if (!data) {
                return res.status(401).json({ message: 'Unathorized' });
            }

            const { email } = data;
            const user = await findUserByEmail(email);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            req.user = user;

            next();
        } else {
            res.status(403).json({ message: 'Enter valid token' });
        }


    } catch (error) {
        return res.status(500).json({ error });
    }

}

module.exports = {
    createUserHandler,
    loginUserHandler,
    isAuthenticated
}
