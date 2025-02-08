import jwt from 'jsonwebtoken';

const auth =()=>{
    return (req,res,next)=>{
        
        const {token} = req.headers;

    const decoded = jwt.verify(token,'asma');
    if(decoded.role != 'admin'){
        return res.status(400).json({message:'not authorized'});
    }
    req.id = decoded.id;
    next(); 
}
}
export default auth;