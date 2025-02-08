import { Router } from "express";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
import auth from "../../middleware/auth.js";
import UserModel from "../../../DB/model/user.model.js";
import { sendemail } from "../../utils/sendemail.js";
import fileUpload from "../../utils/multer.js";
import cloudinary from "../../utils/cloudinary.js";
const router = Router();

router.get('/', auth() , async (req, res) => {
    try{
        const users = await UserModel.findAll({
            attributes:['id','userName','email']
        });
       
        return res.status(200).json({ message: "success", users });
    }catch(error){
        return res.status(500).json({ message: "server error", error });

    }
});

router.delete('/:id',auth(),async(req,res)=>{
    try{
    const {id} = req.params;
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
}catch(error){
    return res.status(500).json({ message: "server error", error });

}
}); 

router.put('/:id',fileUpload().single('image'),async(req,res)=>{

    const {id} = req.params;
    const user = await UserModel.findByPk(id);
    if(user==null){
        return res.status(404).json({message:"user not found"});
    }
    const {secure_url} = await cloudinary.uploader.upload(req.file.path);
    user.profilePic = secure_url;
    await user.save();

    return res.status(200).json({message:"success"});  

});


export default router;