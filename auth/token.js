const jwt = require('jsonwebtoken');
require('dotenv');


 
const secret =  process.env.SECRET || "@nm=%0vx1eqka!f@n3x(vf9+x-o%uh6=7+xpu2fgt4^t9l=wsu4#";
 const user  =  "raushan@gmail.com";
 const password = "123"


  module.exports = function(req, res, next){

      const userName = req.body.userName;
      const userPassword  = req.body.userPassword;
      let token;
      if(!userName || !userPassword){

        return res.json('ooo! user not found you have to signin:( ')
      }

      if(!( user == userName && password == userPassword)){
        return res.json('ooo! please enter valid user name and password :(')
      }

      try {

         token = jwt.sign({ 
            data:{userName: userName, userPassword:password},
        }, secret, {algorithm:"HS256", expiresIn: "60000000"});   
        
      } catch (error) {

        console.log(error);
        
      }

      res.json({token: `Bearer ${token}`})
  }
