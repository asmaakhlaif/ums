import { Router } from "express";
import {loginSchema, registerSchema} from './auth.validation.js'
import validation from "../../middleware/validation.js";
import { login, register } from "./auth.controller.js";
import { asyncHandler } from "../../utils/catchError.js";
const router = Router();

router.post('/register',validation(registerSchema),asyncHandler(register)); 
 
router.post('/login',validation(loginSchema), asyncHandler(login));
export default router;  