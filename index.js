import express from 'express'
import userRouter from './routes/usersRouter.js'

let port = process.env.PORT || 2107

const app = express()


app.use(express.json())
app.use(express.static('public'))
app.use('/users',userRouter)

app.listen(port,()=>{
    console.log('http://localhost:'+port)
})