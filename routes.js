const auth = require('./api/auth/local/index.js');

const routes = function (app) {
    app.use('/api/auth/local', auth);
}

module.exports = routes;
