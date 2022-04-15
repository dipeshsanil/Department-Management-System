var express = require('express');
var router = express.Router();

const { isSignedIn,isAdmin, isAuthenticated} = require("../controllers/auth");
const { getProjectById ,createProject, getAllProjects, deleteProject} = require("../controllers/project");

//params
router.param("userId", getUserById);
router.param("projectId",getProjectById);

router.post("/project/create/:userId", isSignedIn, isAuthenticated, createProject);

router.get("/project/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllProjects);

router.delete("/project/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProject);


module.exports = router;