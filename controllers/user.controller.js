const User = require('../models/user.model');

// Create user
exports.create = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    User.create({
        username: username,
        email: email,
        password: password,
    }).then(user => {
        res.send(user);
    }).catch(err => {
        // If there's an error in inserting the customer in the database
        res.status(500).send({
            message: err
        });
    });
};