const mysql = require('mysql');
const bcrypt = require('bcrypt');
const config = require('../../config'); // get our config file
const jwt = require('jsonwebtoken');
const verified = require('../routes/verify');
const saltRounds = 10;
// Connection Pool
let connection = mysql.createConnection({
  host: '127.0.0.1'/*process.env.DB_HOST*/,
  user: 'root'/*process.env.DB_USER*/,
  password: ''/*process.env.DB_PASS*/,
  database: 'test1'/*process.env.DB_NAME8*/
});

// View Users
exports.view = (req, res) => {
  //res.writeHead(200, {'content-Type' : 'text/html'});
  // User the connection
  connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
   //   let removedUser = req.query.removed;
  //  res.render('home', { rows });
      res.json({ rows });
      
    }
    else
    {
      console.log(err);
    }
   // console.log('The data from user table: \n', rows);
  });
}

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // User the connection
  connection.query('SELECT * FROM user WHERE username LIKE ? OR email LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
   // console.log('The data from user table: \n', rows);
  });
}


// create token
exports.authentication = (req, res) => {

  const { email, password } = req.body;
  let searchTerm = req.body.search;
  
  // User the connection
  connection.query('SELECT * from user WHERE email = ? LIMIT 1', [email], (err, rows) => {
    if (!err) {

      bcrypt.compare(password, rows[0].password, function (err, result) {
        // result == true
        if (result) {

          var user = {
            email: rows[0].email
          }

          // save token in config file
          var token = jwt.sign(user, config.token_secret, {
            expiresIn: 60 * 60 * 10  // expires in 10 hours  
          });
         // res.cookie('auth', token);
        //  res.header('auth',token);

         

           res.json( {
          id: rows[0].id,
          username: rows[0].username,
          email: rows[0].email,
          roles: rows[0].role,
          accessToken: token });
         
          
        }
        else
        res.send({ message: 'email or password is incorrect' });
        
      });

    } else {
      console.log(err);
    }
//    console.log('The data from user table: \n', rows);
  });
}


// Add new user
exports.create = (req, res) => {

  const { username, email, password, role } = req.body;

  let searchTerm = req.body.search;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      // Store hash in your password DB.
      // User the connection
      connection.query('INSERT INTO user SET username = ?, email = ?, password = ?, role = ?', [username, email, hash, role], (err, rows) => {
        if (!err) {
          res.json({msg: 'User added successfully.'});
        } else {
          console.log(err);
        }
     //   console.log('The data from user table: \n', rows);
      });
    });
  });


}


// Edit user
//exports.edit = (req, res) => {
  // User the connection
  //connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
    //if (!err) {
    //  res.render('edit-user', { rows });
    //} else {
    //  console.log(err);
   // }
   // console.log('The data from user table: \n', rows);
  //});
//}


// Update User
exports.update = (req, res) => {
  const { username, email, role } = req.body;
  let id=req.body.id || req.params.id || req.headers['x-access-id'] ;
  // User the connection
  connection.query('UPDATE user SET username = ?, email = ?, role = ? WHERE id = ?', [username, email, role, id], (err, rows) => {

    if (!err) {
      res.json(rows);}
      // User the connection
     // connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it

    //    if (!err) {
     //     res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
   else {
      console.log(err);
    }
   
  });

}

// Delete User
exports.delete = (req, res) => {
  //  let id=req.body.id ;
  var id = req.body.id || req.query.id || req.headers['x-access-id'] ||  req.header('id');
 console.log("idsssddddddddddddd=",id);

   // User the connection
   connection.query('DELETE FROM user WHERE id = ?', [id], (err, rows) => {

     if(!err) {
      res.json({ id });
    //   res.redirect('/');
     } else {
       console.log(err);
    }
    // console.log('The data from user table: \n', rows);

   });

  // Hide a record

 // connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
 //   if (!err) {
  //    let removedUser = encodeURIComponent('User successeflly removed.');
  //    res.redirect('/?removed=' + removedUser);
 //   } else {
 //     console.log(err);
  //  }
 //   console.log('The data from beer table are: \n', rows);
 // });

}

// View User
exports.getuser = (req, res) => {
  let id=req.body.id || req.params.id || req.query.id || req.headers['x-access-id'] ;

  // User the connection
  connection.query('SELECT * FROM user WHERE id = ?', [id], (err, rows) => {
    if (!err) {
     res.json({rows});
     
    } else {
      console.log(err);
    }
   // console.log('The data from user table: \n', rows);
  });

}