var express = require('express');
var router = express.Router();

const {isSignedIn,isAdmin, isAuthenticated} = require("../controllers/auth");
const { createAnnouncement, getAnnouncement, getAllAnnouncement, removeAnnouncement, getAnnouncementById } = require('../controllers/announcement');
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("announcementId",getAnnouncementById);

router.post("/announcement/create/:userId", isSignedIn, isAdmin, isAuthenticated, createAnnouncement);

//read
router.get("/announcement/:announcementId", getAnnouncement);
router.get("/announcements", getAllAnnouncement);

//delete
router.delete("/announcement/:announcementId/:userId", isSignedIn, isAdmin, isAuthenticated, removeAnnouncement);

module.exports = router;
