import { Router } from "express";
import bcrypt from "bcryptjs"
import UserModel from "../../../DB/model/user.model.js";
const router = Router();

router.get('/',async(req,res)=>{
    const users = await UserModel.findAll();
    return res.status(200).json({message:"success",users});
});

router.post('/',async(req,res)=>{
    const {userName,email,password} = req.body;
    const hashPassword = bcrypt.hashSync(password,8);

    await UserModel.create({userName,email,password:hashPassword});
    return res.status(201).json({message:"success"});
});

export default router;