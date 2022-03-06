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

// Add win
exports.addWin = (req, res) => {
    const userId = req.params.userId;
    
    User.findByPk(userId)
    .then(user => {
        // Increment the wins counter
        user.wins += 1
        // Save the updated user into the database
        user.save().then(updatedUser => {
            res.send(updatedUser);
        }).catch(err => {
            res.status(500).send({
                message: "Error updating user's wins"
            });
        });
    }).catch(err => {
        res.status(404).send({
            message: 'User not found'
        });
    });
};

// Add loss
exports.addLoss = (req, res) => {
    const userId = req.params.userId;
    
    User.findByPk(userId)
    .then(user => {
        // Increment the wins counter
        user.losses += 1
        // Save the updated user into the database
        user.save().then(updatedUser => {
            res.send(updatedUser);
        }).catch(err => {
            res.status(500).send({
                message: "Error updating user's losses"
            });
        });
    }).catch(err => {
        res.status(404).send({
            message: 'User not found'
        });
    });
}