const User = require('../models/user.model');
const Session = require('../models/session.model');

const sessionOperations = require('../utils/session.operations');

const uuid = require('uuid');

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ where: { username: username }}).then(user => {
        if (user) {
            if (user.password === password) {
                // Generate UUID
                const token = uuid.v4();
                // Session token expires in 30 minutes from now
                const expireDate = Date.now() + 30*60*1000;
                
                // Create new session for that user and return it to the client
                Session.create({
                    expireDate: expireDate,
                    token: token,
                    userId: user.id
                }).then(session => {
                    res.send(session);
                }).catch(err => {
                    res.status(500).send({
                        message: 'Error inserting the session in the database'
                    });
                });
            } else {
                res.status(401).send({
                    message: 'Wrong password!'
                });
            }
        } else {
            res.status(404).send({
                message: 'User not found'
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: 'Server error during login'
        });
    })
    
};

exports.logout = (req, res) => {
    const token = req.headers['token'];
    
    sessionOperations.isExpired(token)
    .then(isExpired => {
        if (!isExpired) {
            sessionOperations.setExpiredNow(token)
            .then(loggedOut => {
                if (loggedOut) {
                    res.status(200).send({
                        message: 'Successfully logged out'
                    });
                } else {
                    res.status(500).send({
                        message: 'Server error during logout'
                    });
                }
            });
        } else {
            res.status(401).send({
                message: 'Token not valid or expired'
            });
        }
    });
    
};
