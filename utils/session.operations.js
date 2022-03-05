const Session = require('../models/session.model');

module.exports = {
    //@return Promise
    isExpired: function(token) {
        // It returns a promise, so use then when you call it
        return Session.findOne({ where: {token: token }})
        .then(session => {
            return (Date.now() >= session.expireDate);
        }).catch(err => {
            return true;
        });
    },

    //@return Promise
    setExpiredNow: function(token) {
        // It returns a promise, so use then when you call it
        return Session.findOne({ where: {token: token }})
        .then(session => {
            session.expireDate = Date.now();
            return session.save().then(() => {
                return true;
            }).catch(err => {
                return false;   
            });
        }).catch(err => {
            console.log(err);
            return false;
        });
    },

    //@return Promise
    renewSession: function(token) {
        const renewedTime = 30*60*1000; // renew session for 30 minutes more
        // It returns a promise, so use then when you call it
        return Session.findOne({ where: {token: token }})
        .then(session => {
            session.expireDate = Date.now() + renewedTime;
            return session.save().then(() => {
                return true;
            }).catch(err => {
                return false;   
            });
        }).catch(err => {
            console.log(err);
            return false;
        });
    }
};