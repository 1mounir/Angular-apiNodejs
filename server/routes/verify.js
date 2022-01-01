var express = require("express");
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../../config'); // get our config file
var router = express.Router();
const mysql = require('mysql');
// How are tokens saved on backend?
// They're not stored server side -- they're issued to the client and the client presents them on each call.
// They're verified because they're signed by the host's own protection key.
// In SystemWeb hosting, that protection key is the machineKey setting from web.config.
let connection = mysql.createConnection({
    host: '127.0.0.1'/*process.env.DB_HOST*/,
    user: 'root'/*process.env.DB_USER*/,
    password: ''/*process.env.DB_PASS*/,
    database: 'test1'/*process.env.DB_NAME8*/
  });
checkAuth=(req, res, next) => {

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.auth || req.header('token');
       
       
        // decode token
        if (token) { 
            // verifies secret and checks exp
            jwt.verify(token, config.token_secret, function(err, decoded) {

                if (err) {  
                    return res.json({ success: false, message: 'Failed to authenticate token.'});
                } else { 
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
        // if there is no token, return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
           
        }
    };

    checkRoles =(req, res, next) => {
        
        var clientEmail = req.body.clientEmail || req.query.clientEmail || req.headers['x-access-clientEmail'] || req.cookies.clientEmail || req.header('clientEmail');

      
        if(clientEmail){
        // User the connection
        connection.query('SELECT * FROM user WHERE email = ?', [clientEmail], (err, rows) => {
          if (err) {
               
         res.json('error',err);
         
          } else {

             if(rows[0].role=='admin'){
                next();

              }
              else res.send('error not permession');
                  //console.log("nexxxxxxxxxxxxx=",id);
          }
         
        });
      }
      }
    const verify = {
        checkAuth: checkAuth,
        checkRoles: checkRoles
      };
module.exports = verify;