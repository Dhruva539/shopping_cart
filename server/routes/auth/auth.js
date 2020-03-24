const jwt= require('jsonwebtoken');
const authdata=require('../../json/authdata.json')
const config= require('../../../config/config');
module.exports= function auth(router) {
  // Sign in user
  router.post('/auth/login',(req,res,next) =>{
      console.log("Inside the login",req.url);
     let secret_key= config.secret_key;
     let user = authdata.users.filter((user) =>{
       console.log(user.username,user.password)
      return user.username === req.body.username && user.password === req.body.password
     }) 
      
     console.log(user);
     // create JWT token using username and password for expiry of 2 hours
       if(user.length) {
        
        let token_payload= {name:user[0].username,password:user[0].password};
        let token= jwt.sign(token_payload,secret_key,{ expiresIn: '1h'});
        let resObj ={
          "username" : req.body.username,
          "role"     : user.role, 
          "authenticated" :true,
          "message" : 'Authentication is sucessfull!'
        }
         res.append('x-auth-token',token);
         res.status(200).json(resObj)
       } 
       else {
         let resObj={
           "authenticated":false,
           "message": "Authentication Failed."
         }
         res.status(401).json(resObj);
       }
  })
}
