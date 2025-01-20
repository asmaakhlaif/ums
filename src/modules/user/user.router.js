import { Router } from "express";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';

import UserModel from "../../../DB/model/user.model.js";
const router = Router();

router.get('/', async (req, res) => {
    const {token} = req.headers;

    const decoded = jwt.verify(token,'asma');
    if(decoded.role != 'admin'){
        return res.status(400).json({message:'not authorized'});
    }


    const users = await UserModel.findAll({
        attributes:['id','userName','email']
    });
    return res.status(200).json({ message: "success", users });
});

router.delete('/:id',async(req,res)=>{
    const {id} = req.params;
    const {token} = req.headers;

    const decoded = jwt.verify(token,'asma');
    if(decoded.role != 'admin'){
        return res.status(400).json({message:'not authorized'});
    }
    return res.json(decoded);

    const user = await UserModel.findByPk(id);
    if(user==null){
        return res.status(404).json({message:"user not found"});
    }

    await UserModel.destroy({
        Where:{
            id
        }
    });
    return res.status(200).json({message:"success"});
});


export default router;