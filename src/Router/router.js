const express= require('express');
const router = express.Router();
const user = require('../controller/userController')

router.post("/userSignUp",user.userSignUp)
router.post("/userLogin",user.userLogin);





module.exports = router;