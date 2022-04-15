var express = require('express');
var router = express.Router();

const {signout, signup, signin, isSignedIn, isAuthenticated} = require("../controllers/auth")
const {getUserById, getUser, updateUser, deleteUser, getAllUser} = require("../controllers/user")


router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

router.get("/users", getAllUser);
router.get("/profile/:userId", getUser);

router.put('/user/:userId',updateUser);

router.delete("/user/:userId", isSignedIn , deleteUser);

module.exports = router;
