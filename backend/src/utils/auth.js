import sendResponse from "./sendResponse.js";
import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return  sendResponse(req, res, {status:401, message:"Unauthorized"});
  
    }
    const token = authHeader.split(" ")[1]; 
    try {
        const decoded = jwt.verify(token, "JWT_SECRET_KEY");
        req.user = decoded; 
        if(decoded.exp * 1000 < Date.now()){
          return sendResponse(req,res,{status:401,message:"Session Expired Please Login Again"}); 
        }   
        next(); 
    } catch (err) {
        return sendResponse(req,res,{status:500,message:"Invalid Token Please Login Again"}); 
    }
};

export default auth;