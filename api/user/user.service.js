const User = require('./user.model.js');

const createUser = (user) => User.create(user);
const findUserByEmail = (email) => User.findOne({ email });


module.exports = {
    createUser,
    findUserByEmail
}
