import { loginSchema } from "../modules/auth/auth.validation.js"



const validation = (schema)=>{
    return(req,res,next)=>{

        const result= schema.validate(req.body ,{abortEarly:false});
    if (result.error){
        return res.status(400).json({message:"validation error",error:result.error.details})
    }else{
        next();
    }

    }
}

export default validation;