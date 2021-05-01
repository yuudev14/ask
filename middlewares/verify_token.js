const db = require('../db');
const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = async(req, res, next) => {
    try {
        const token = req.headers.token;
        if(!token){
            res.status(403).send('no token submitted to server');
        }else{
            const db_tokens = await db.query("SELECT * FROM tokens WHERE token = $1", [token]);
            if(db_tokens.rows.length === 0){
                res.status(403).send('token is not authorize');
            }else{
                const payload = jwt.verify(token, process.env.jwtSecret)
                req.user = payload.user;
                next();
            }
        }
    } catch (error) {
        res.send(err)
        
    }
    

}