import dotenv from 'dotenv'
import express from "express"
import router from './routes/dweetRoutes.js'
import db from './config/db.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import authRouter from './routes/authRouter.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/api/dweets', router)

app.use('/api/auth', authRouter)

app.use(express.json())

db.connect(()=>{
    try {
        app.listen(process.env.PORT, ()=>{
            console.log("Connected to DB and Listening")
        })
    } catch (error) {
        console.log(error)
    }
})
