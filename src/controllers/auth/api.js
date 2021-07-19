'use strict'

require('dotenv').config();
const jwt = require('jsonwebtoken');

function login(req, res) {
    (async() => {
        try{
            const {username, password} = req.body;
            
            let userInfo = {
                name: 'Khoa',
                age: 23
            }
            
            if( username === 'khoa_le' && password === '123456') {
                const access_token = jwt.sign({sub: username}, process.env.JWT_ACCESS_SECRET, {expiresIn: process.env.JWT_ACCESS_TIME})
                return res.status(200).json({
                    ok: true,
                    message: 'login success',
                    data: {
                        userInfo,
                        access_token
                    }
                })
            }
            
            return res.status(400).json({
                ok: false,
                message: 'login fail',
                errorCode: 'LOGIN FAIL'
            })
        } catch (e) {
            return res.status(500).json({
               ok: false,
               message: e.message,
               errorCode: 'LOGIN_FALSE' 
            });
        }
    })();  
}

module.exports = {
    login
}