module.exports = app => {
    const users = require('../controllers/user.controller');

    var router = require("express").Router();

    router.post('/sign-up', users.create);

    router.get('/user/:userId', users.getById);

    router.put('/addWin/:userId', users.addWin);

    router.put('/addLoss/:userId', users.addLoss);

    router.put('/addDraw/:userId', users.addDraw);

    router.get('/getRanking', users.getRanking);

    app.use('/', router);
};