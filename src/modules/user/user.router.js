import { Router } from "express";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';

import UserModel from "../../../DB/model/user.model.js";
import { where } from "sequelize";
const router = Router();

router.get('/', async (req, res) => {
    const users = await UserModel.findAll();
    return res.status(200).json({ message: "success", users });
});

router.post('/', async (req, res) => {
    const { userName, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 8);

    await UserModel.create({ userName, email, password: hashPassword });
    return res.status(201).json({ message: "success" });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({
        where: { email: email }
    });
    if (user == null) {
        return res.status(404).json({ message: "invalid email" });
    }

    const check = await bcrypt.compareSync(password, user.password);
    if (check == false) {
        return res.status(400).json({ message: "invalid password" })
    }
    const token = jwt.sign({ id:user._id,name:user.userName }, 'asma');
    return res.status(200).json({ message: "success", token });
});

export default router;