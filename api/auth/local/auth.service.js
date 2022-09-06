const User = require('../../user/user.model');

const createUser = (user) => User.create(user);
const findUserByEmail = (email) => User.findOne({ email });

module.exports = {
    createUser,
    findUserByEmail
}
