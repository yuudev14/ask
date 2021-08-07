const db = require('../../db');
const bcrypt = require('bcrypt');
const generate_token = require('../../utils/generate_token');
const check_email_exist_method = async(email, type) => {

    try {
        const result = db.query(`SELECT * FROM accounts
                                WHERE email = $1 AND 
                                account_type = $2`, [email, type]);
        return result
        
    } catch (error) {
        throw error
        
    }

}

const check_email_exist = async(req, res) => {

    try {
        const {email, type} = req.body;
        const accounts = await(check_email_exist_method(email, type))
        const result = accounts.rows.length > 0 ? true : false;
        res.send(result);
        
    } catch (err) {
        console.log(err);
        
    }
}

const login_method = (req, res, password, account) => {
    bcrypt.compare(password, account.rows[0].password, async(err, isMatch) => {
        if(err) console.log(err);
        if(isMatch){
            const token = generate_token(account.rows[0].user_id);
            await db.query("INSERT INTO tokens (token) VALUES ($1)", [token]);
            res.send({token});
        }else{
            res.status(401).send('password is incorrect');
        }
    })
}

const oAuth = async(req, res) => {
    const {email, first_name, last_name, password, type, profile_pic} = req.body;
    try {
        const account = await(check_email_exist_method(email, type))
        if(account.rowCount > 0){
            login_method(req, res, password, account)

        }else{

            bcrypt.genSalt(10, (err, salt) => {
                if(err) throw err;
                bcrypt.hash(password, salt, async(err, encrypted_password) => {
                    try {
                        if(err) throw err;
                        const username_no = await db.query(`SELECT * FROM accounts WHERE username = $1`, [first_name + last_name]);
                        const finalUsername = first_name + last_name + `${username_no.rowCount + 1}`
                        const user = await db.query(`INSERT INTO accounts 
                                                    (email, first_name, last_name, password, username, account_type, profile_pic) 
                                                    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
                                                    [email, first_name, last_name, encrypted_password, finalUsername, type, profile_pic]);
                        const token = generate_token(user.rows[0].user_id);
                        await db.query("INSERT INTO tokens (token) VALUES ($1)", [token]);
                        res.send({token});
                    } catch (error) {
                        console.log(error) 
                    }
        
                })
            })  
        }
        
        
    } catch (error) {
        throw error
        
    }
}
const register = (req, res) => {
    const {email, first_name, last_name, password, username, type} = req.body;
    if(type === undefined){
        bcrypt.genSalt(10, (err, salt) => {
            if(err) throw err;
            bcrypt.hash(password, salt, async(err, encrypted_password) => {
                try {
                    if(err) throw err;
                    const user = await db.query("INSERT INTO accounts (email, first_name, last_name, password, username) VALUES ($1, $2, $3, $4, $5) RETURNING *", [email, first_name, last_name, encrypted_password, username]);
                    const token = generate_token(user.rows[0].user_id);
                    await db.query("INSERT INTO tokens (token) VALUES ($1)", [token]);
                    res.send({token});
                } catch (error) {
                    if(error.constraint === 'accounts_username_key'){
                        res.status(409).send('Username already exist try again')
                    }
                    
                }
                
    
            })
        })

    }else{
        oAuth(req,res);
    }
    
        
    
}
const logout = async(req, res) => {
    try {
        const token = req.headers.token;
        await db.query("DELETE FROM tokens where token = $1",[token]);
        res.send(true);
        
    } catch (err) {
        console.log(err);
        
    }
}

const login = async(req, res) => {
    
    try {
        const {email, password} = req.body;
        const type = 'app_email';
        const account = await(check_email_exist_method(email, type))
        if(account.rows.length === 0){
            res.status(401).send('email does not exist try aain');
        }else{
            login_method(req, res, password, account)
        }
        
    } catch (error) {
        console.log(error);
        
    }

}

module.exports = {
    check_email_exist,
    register,
    login,
    logout,
    oAuth
}