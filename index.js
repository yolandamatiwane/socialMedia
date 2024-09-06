import express from 'express'
import userRouter from './routes/usersRouter.js'
import postRouter from './routes/postsRouter.js'
import commentRouter from './routes/commentsRouter.js'
import cors from 'cors'

let port = process.env.PORT || 2107

const app = express()

app.use(cors(
    {
    origin: "http://localhost:8080",
    credentials:true
    }
))


app.use(express.json())

app.use(express.static('public'))
app.use('/users',userRouter)
app.use('/posts',postRouter)
app.use('/post',commentRouter)
app.listen(port,()=>{
    console.log('http://localhost:'+port)
})