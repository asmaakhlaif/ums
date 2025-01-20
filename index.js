import express from 'express';
import { connectDB } from './DB/connection.js';
import userRouter from './src/modules/user/user.router.js';
import authRouter from './src/modules/authentication/authentication.router.js'
const app = express();
connectDB();

app.use(express.json());

app.use('/users',userRouter);
app.use('/auth',authRouter);

app.listen(3000);