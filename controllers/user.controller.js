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
        res.status(409).send({
            message: 'This username already exists, please choose another one'
        });
    });
};

// Get user by id
exports.getById = (req, res) => {
    const userId = req.params.userId;

    User.findByPk(userId)
    .then(user => {
        res.send(user);
    }).catch(err => {
        res.status(404).send({
            message: 'User not found'
        });
    })
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
};

// Add draw
exports.addDraw = (req, res) => {
    const userId = req.params.userId;
    
    User.findByPk(userId)
    .then(user => {
        // Increment the wins counter
        user.draws += 1
        // Save the updated user into the database
        user.save().then(updatedUser => {
            res.send(updatedUser);
        }).catch(err => {
            res.status(500).send({
                message: "Error updating user's draws"
            });
        });
    }).catch(err => {
        res.status(404).send({
            message: 'User not found'
        });
    });
};

// Function that calculates the score of a user
function calculateScore(user) {
    return ( user.wins - user.losses );
}

// Function that returns an array with username and total score
function getScoreList(usersList) {
    var scoreList = [];
    for (let user of usersList) {
        scoreList.push({
            username: user.username,
            score: calculateScore(user)
        });
    }
    return scoreList;
}

// Function to compare the scores of two users
function compare( user1, user2 ) {
    if ( user1.score < user2.score ){
      return 1;
    }
    if ( user1.score > user2.score ){
      return -1;
    }
    return 0;
  }

// Get ranking
exports.getRanking = (req, res) => {
    User.findAll()
    .then(usersList => {
        let scoreList = getScoreList(usersList);
        scoreList.sort(compare);
        res.send(scoreList);
    }).catch(err => {
        res.status(500).send({
            message: 'Internal server error: '+err
        });
    })
};