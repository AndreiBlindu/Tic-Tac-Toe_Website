module.exports = app => {
    const users = require('../controllers/user.controller');

    var router = require("express").Router();

    router.post('/sign-up', users.create);

    app.use('/', router);
};