const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const userController = require('../controllers/userController');
const verified = require('../routes/verify');


// Routes


router.post('/login',userController.authentication);

// admin security
router.get('/admin',[verified.checkAuth,verified.checkRoles],userController.view);
router.delete('/user', [verified.checkAuth,verified.checkRoles],userController.delete);
router.put('/user',[verified.checkAuth,verified.checkRoles],userController.update);
///
router.get('/user',userController.getuser);
router.post('/user',userController.create);



  
module.exports = router;