import db from "../config/db.js"

const getDweets = (req, res)=>{
    db.query('SELECT A.*, B.user from dweets as A INNER JOIN users as B ON A.user_id = B.user_id; SELECT *, COUNT(hashtag) FROM hastags ORDER BY COUNT(hashtag) DESC', (error, result)=>{
        console.log(error)
        try {
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
        }
    })
}

const createUser = (req, res)=>{
    let qry = 'INSERT into users (user, password, email) VALUES (?, ?, ?)'
    const {user, password, email} = req.body
    db.query(qry, [`${user}`, `${password}`, `${email}`], (error, result)=>{
        try {
            console.log(result)
            res.status(201).json(result)
        } catch (error) {
            console.log(error)
        }
    })
}

const createDweet = (req, res)=>{
    const {id} = req.body
    const {dweet} = req.body
    const {hashtag} = req.body
    let qry = 'INSERT into dweets (user_id, dweet) VALUES (?, ?); INSERT INTO hastags (hashtag) VALUES (?)'
    db.query(qry, [id, dweet, hashtag], (error, result)=>{
        console.log(error)
        try {
            console.log(result)
            console.log("inserted")
            res.status(201).json(result)
        } catch (error) {
            console.log(error)
            
        }
    })
}

const getUserDweets = (req, res)=>{
    const {id} = req.params
    db.query('SELECT * from dweets where user_id = ?', [id], (error, result)=>{
        try {
            res.status(200).json(result)
        } catch (error) {
            console.log(error)            
        }
    })
}

const followUser = (req, res)=>{
    let {id} = req.params
    let {user_id} = req.body
    let qry = 'INSERT into followers (id_user, id_following) VALUES (?, ?)'
    db.query(qry, [user_id, id], (error, result)=>{
        try {
            res.status(201).json(result)
        } catch (error) {
            console.log(error)
        }
    })
}

const unfollowUser = (req, res)=>{
    let {id} = req.params
    let {user_id} = req.body
    let qry = 'DELETE from followers where id_user = (?) and id_following = (?)'
    db.query(qry, [user_id, id], (error, result)=>{
        try {
            res.status(201).json(result)
        } catch (error) {
            console.log(error)
        }
    })
}

const getUserFollowers = (req, res)=>{
    let {id} = req.body
    let qry = 'SELECT * FROM users INNER JOIN followers ON (users.user_id = followers.id_user) WHERE followers.id_following = (?); SELECT * FROM users INNER JOIN followers ON (users.user_id = followers.id_user) WHERE followers.id_user = (?); SELECT * from dweets where user_id = (?)'
    db.query(qry, [id, id, id], (err, result)=>{
        try {
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
        }
    })
}

const dweetComment = (req, res)=>{
    let {id} = req.body
    let {comment} = req.body
    let {dweet_id} = req.body
    let qry = 'INSERT into comments (user_id, commnt, dweet_id) VALUES (?, ?, ?)'
    db.query(qry, [id, comment, dweet_id], (error, result)=>{
        try {
            res.status(201).json(result)
        } catch (error) {
            console.log(error)
        }
    })
}

const getDweetComments = (req, res)=>{
    let {dweet_id} = req.body
    let qry = 'SELECT A.*, B.user from comments AS A INNER JOIN users AS B ON (A.user_id = B.user_id) where dweet_id = (?)'
    db.query(qry, [dweet_id], (error, result)=>{
        try {
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
        }
    })
}
export {getDweets, getUserDweets, createUser, createDweet, getUserFollowers, followUser, dweetComment, getDweetComments, unfollowUser}