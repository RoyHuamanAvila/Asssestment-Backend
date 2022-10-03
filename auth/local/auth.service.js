const User = require('./auth.model');

const createUser = (user) => User.create(user);
const findUserByEmail = (email) => User.findOne({ email });
const updateUser = (id, data) => User.findByIdAndUpdate(id, data, { new: true, runValidators: true });

module.exports = {
    createUser,
    findUserByEmail,
    updateUser
}
