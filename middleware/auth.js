const jwt = require("jsonwebtoken");
require("dotenv");

const secret = process.env.SECRET 
const user = "raushan@gmail.com";
const password = "123";

module.exports = (req, res, next) => {

  // if user is genrating the token then don't do anyting
  
    //  console.log(req.path.endsWith('login'));
    
   if(req.path.endsWith('login')){
 
      next();
      return;
   }

  const token = req.headers.authorization;

   if(!token){
      console.log(token);
      res.json({description: "Please provide bearer token."});
      return;
   }

    try {

        const decoded = jwt.verify(token.slice(7), secret);

        if(decoded.data.userName != user || decoded.data.userPassword != password ){
            //  console.log(decoded.data);
            res.json({error: "Invalid uer id or password"});
            return;
        }

        // return res.send(decoded);
        
    } catch (error) {


         if(error instanceof jwt.TokenExpiredError ){
            return res.json({error: "session expire please regenerate token"});
            
         }
          
         if(error instanceof jwt.JsonWebTokenError){

             return res.json({error: "Invalid web token"})
         }

         next(error);
        
    }

    next();
};
