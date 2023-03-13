import express from 'express';
import cors from 'cors';
import 'express-async-errors'
import { authRouter } from './auth/authRoutes';
import { connectDB } from './config/dbConfig';
const app = express();
const port = 4000;
const corsOptions = {
  origin: 'http://127.0.0.1:5173',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

connectDB();
app.use(cors(corsOptions));
app.use(express.json());
app.use(authRouter)

app.listen(port, () => console.log(`listening on port ${port}!`))