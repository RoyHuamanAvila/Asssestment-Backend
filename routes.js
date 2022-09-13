const auth = require('./api/auth/local/index.js');
const listFavs = require('./api/listFavs/index.js');
const { isAuthenticated } = require('./api/auth/local/auth.controller');

const routes = function (app) {
    app.use('/auth/local', auth);
    app.use('/api/favs', isAuthenticated, listFavs);
}

module.exports = routes;
