import { connectDB } from '../DB/connection.js';
import userRouter from './modules/user/user.router.js';
import authRouter from './/modules/auth/auth.router.js'
import blogRouter from './modules/blog/blog.router.js';


const initApp=(app,express)=>{
    connectDB();

app.use(express.json());
app.use('/users',userRouter);
app.use('/auth',authRouter);
app.use('/blogs',blogRouter);
app.use((err,req,res,next)=>{
    return res.status(err.statusCode).json({message:err.message});
})
}
export default initApp;  