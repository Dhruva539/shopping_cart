const config= require('../../../config/config');
const X_AUTH_TOKEN= 'x-auth-token';
const jwt= require('jsonwebtoken');
module.exports= function validateToken(router) {
  router.use('/',(req,res,next) =>{
    let token = getToken(req);
  
    if(token) {
        jwt.verify(token,config.secret_key,(err,decode) =>{
          if(err) {
            return res.json({
              success: false,
              message:'Token is not Valid'
            })
          } else {
            req.decoded=decode;
            next();
          }
        })

    } else {
      return res.json({
        success:false,
        message:'Token is not supplied'
      })
    }
  })
}

const getToken=(req) =>{
  let token= req.headers[X_AUTH_TOKEN];
  return token;
}