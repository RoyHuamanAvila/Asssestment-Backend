const User = require('../../api/user/user.model.js');

const createUser = (user) => User.create(user);
const findUserByEmail = (email) => User.findOne({ email });
const updateUser = (id, data) => User.findByIdAndUpdate(id, data, { new: true });

module.exports = {
    createUser,
    findUserByEmail,
    updateUser
}
