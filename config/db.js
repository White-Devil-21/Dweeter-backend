import dotenv from 'dotenv'
import mysql from 'mysql'

dotenv.config()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASS ,
    database: 'dweeter',
    multipleStatements: true
})


export default db