const auth = require('./auth/local/index.js');
const listFavs = require('./api/listFavs/index.js');
const favs = require('./api/fav/index.js');
const { isAuthenticated } = require('./auth/local/auth.controller.js');

const routes = function (app) {
    app.use('/auth/local', auth);
    app.use('/api/favs', isAuthenticated, listFavs);
    app.use('/api/singleFav', isAuthenticated, favs);
}

module.exports = routes;
