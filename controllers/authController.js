import jwt from 'jsonwebtoken';
import bcrtpt from 'bcrypt';
import db from "../config/db.js"

const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1d'})
}

const login = async(req, res) =>{
    let qry = 'SELECT * FROM users WHERE email = (?)'
    let values = [req.body.email]
    db.query(qry, values, (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            if(req.body.password == result[0].password){
                const token = createToken(result[0].id)
                console.log("User logged in")
                res.status(200).json({email: result[0].email, token, id: result[0].user_id})

            }else{
                res.status(400).json({error: "Wrong password"})
            }
        }else{
            res.status(400).json({error: "Wrong email"})
        }
    })
}

const signup = async(req, res) =>{
    let qry = 'INSERT into users (email, password, user) VALUES (?, ?, ?)'
    const hashedPassword = await bcrtpt.hash(req.body.password, 10)
    let values = [req.body.email, hashedPassword, req.body.user] 
    db.query(qry, values, (err, result) => {
        if(err) throw err;
        console.log("User created")
        res.status(200).json({message: "User created"})
    })
}

export { login, signup }
