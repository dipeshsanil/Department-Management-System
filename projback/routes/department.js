var express = require('express');
var router = express.Router();

const {isSignedIn,isAdmin, isAuthenticated} = require("../controllers/auth");
const { createDepartment, updateDepartment, getDepartment, getDepartmentById, getAllDepartment, removeDepartment } = require('../controllers/department');
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("departmentId",getDepartmentById);

router.post("/department/create/:userId", isSignedIn, isAdmin, isAuthenticated, createDepartment);

//read
router.get("/department/:departmentId", getDepartment);
router.get("/departments", getAllDepartment);

//update
router.put("/department/:departmentId/:userId", isSignedIn, isAdmin, isAuthenticated, updateDepartment);

//delete
router.delete("/department/:departmentId/:userId", isSignedIn, isAdmin, isAuthenticated, removeDepartment);

module.exports = router;
