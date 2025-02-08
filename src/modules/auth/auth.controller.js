import bcrypt from "bcryptjs"
import UserModel from "../../../DB/model/user.model.js";
import jwt from 'jsonwebtoken';
import { AppError } from "../../utils/AppError.js";



export const register = async (req, res) => {
   
        const { userName, email, password } = req.body;
    
        const hashPassword = bcrypt.hashSync(password, 8);
    
        await UserModel.create({ userName, email, password: hashPassword });
        const html = `<div> <h2> new user </h2> <p> welcome ${userName} </p> </div>`
        await sendemail(email,"welcome",html);
        return res.status(201).json({ message: "success" });
    
    }


    export const login = async (req, res,next) => {
    
        const { email, password } = req.body;
        const user = await UserModel.findOne({
            where: { email: email }
        });
        if (user == null) {
            //return res.status(404).json({ message: "invalid email" });
            return next(new AppError("invalid email",404));
        }
    
        const check = await bcrypt.compareSync(password, user.password);
        if (check == false) {
            //return res.status(400).json({ message: "invalid password" })
            return next(new AppError("invalid password",400));
        }
        const token = jwt.sign({ id:user._id,name:user.userName ,role:user.role }, 'asma');
        return res.status(200).json({ message: "success", token });
    } 
