const { VerifyTokenForUser } = require("../service/Authorization");

function CheckForAuthentication(cookie){
    
    return (req,res,next)=>{
        const cookieValue = req.cookies[cookie];
    

        if(!cookieValue){
            
            return next();
        }
        try{
             
            const UserPayload = VerifyTokenForUser(cookieValue);
            req.user = UserPayload;
         
            
        }catch(error){}

       return next();
       
        
    }
}

module.exports = CheckForAuthentication