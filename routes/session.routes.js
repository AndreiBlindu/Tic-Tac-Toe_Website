module.exports = app => {
    const sessions = require('../controllers/session.controller');

    var router = require("express").Router();

    // Login
    router.post('/auth', sessions.login);

    // Logout
    router.get('/logout', sessions.logout);

    app.use('/', router);
};