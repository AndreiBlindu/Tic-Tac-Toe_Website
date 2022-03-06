module.exports = app => {
    const users = require('../controllers/user.controller');

    var router = require("express").Router();

    router.post('/sign-up', users.create);

    router.put('/addWin/:userId', users.addWin);

    router.put('/addLoss/:userId', users.addLoss);

    app.use('/', router);
};