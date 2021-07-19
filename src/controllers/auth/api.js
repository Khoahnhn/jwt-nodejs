'use strict'

function login(req, res) {
    (async() => {
        try{
            const {username, password} = req.body;
            
            let userInfo = {
                name: 'Khoa',
                age: 23
            }
            
            if( username === 'khoa_le' && password === '123456') {
                return res.status(200).json({
                    ok: true,
                    message: 'login success',
                    data: userInfo
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