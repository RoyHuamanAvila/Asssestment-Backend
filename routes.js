const user = require('./api/user/index.js');

const routes = function (app) {
    app.use('/api/auth/local', user);
}

module.exports = routes;
