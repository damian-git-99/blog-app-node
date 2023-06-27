import express from 'express'
import { engine } from 'express-handlebars'
import path from 'path'
import cors from 'cors'
import 'express-async-errors'
import cookieParser from 'cookie-parser'
import { authRouter } from './auth/authRoutes'
import { connectDB } from './config/dbConfig'
import { errorHandler } from './middlewares/errorHandler'
import { userRouter } from './user/userRoutes'
import { postRouter } from './posts/postRoutes'
import { corsOptions } from './config/corsConfig'

connectDB()
const app = express()

const port = process.env.PORT || 4000

// view config
app.set('views', path.join(__dirname, 'views'))
app.engine(
  'hbs',
  engine({
    extname: 'hbs'
  })
)
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: false }))
// view config

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(authRouter)
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use(errorHandler)

app.listen(port, () => console.log(`listening on port ${port}!`))
