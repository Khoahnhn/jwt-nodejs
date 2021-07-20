'use strict'
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const debug = require('debug')('debug:passport');
const jwt = require("jsonwebtoken");

function logIp(req) {
	try {
		console.log('Client request IP: ' + req.headers['x-forwarded-for'] + ' / ' +
			req.connection.remoteAddress + ' / ' +
			req.socket.remoteAddress + ' / ' +
			(req.connection.socket ? req.connection.socket.remoteAddress : null) + ' / ' +
			req.ip);
	} catch (e) {
	}
}

let otps_user = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_ACCESS_SECRET
}

let userStrategy = new JwtStrategy(otps_user, async function(payload, done) {
    try {
        console.log(payload);
        let user = {
            name: 'Khoa',
            age: 23
        };
        if(!user) return done(null, false);
        done(null, user, payload);
    } catch (error) {
    	debug(error);
    	done(error, false);
    }
});

passport.use('user-rule', userStrategy);

function auth(req, res, next) {
    logIp(req);

    return passport.authenticate('user-rule', {session: false}, async function(err, user, payload) {
        if(!user) {
            return res.status(403).json({
                message: 'Unauthorized_account',
                errorCode: '00000'
            })
        }
        if(err){
            return res.status(401).json({
                message: 'Token is expired',
                errorCode: '11111'
            })
        }
        req.user = user;
        next();
    })(req, res, next);   
}

// verify using jwt 
// function auth(req, res, next) {
//     let token = req.headers["x-access-token"] || req.headers['authorization'];
//
//     if (!token) {
//         return res.status(403).send({ message: "Auth token is not supplied!" });
//     }
//
//     jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(403).send({ message: "Token is not valid" }); // Token is not valid
//         } else {
//             req.user = {
//                 name: 'Khoa',
//                 age: 23
//             };
//             if(!req.user) return res.status(401).send({ message: "Unauthorized!" });
//             next();
//         }
//     });
// }

module.exports = {
	auth
}


