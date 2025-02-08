import { Router } from "express";
import auth from "../../middleware/auth.js";
import BlogModel from "../../../DB/model/blog.model.js";
import {createBlog ,getBlog} from './blog.controller.js'
import {asyncHandler} from '../../utils/catchError.js'
const router = Router();
router.get('/',asyncHandler(getBlog));
router.post('/',auth(),asyncHandler(createBlog)); 

export default router; 
  