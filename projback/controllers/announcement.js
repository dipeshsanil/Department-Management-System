const Announcement = require("../models/announcement")

exports.getAnnouncementById = (req, res, next, id) => {
    Announcement.findById(id).exec((err, announcement) => {
        if(err){
            return res.status(400).json({
                error: "Announcement not found in DB"
            })
        }
        req.announcement = announcement;
        next();
    });
};

exports.createAnnouncement = (req, res) => {
    const announcement = new Announcement(req.body);
    announcement.save((err, announcement) => {
        if(err){
            return res.status(400).json({
                error: "Not able to save announcement in DB"
            });
    }
    res.json({ announcement });
   });
};

exports.getAnnouncement = (req, res) =>{
    return res.json(req.announcement);
};

exports.getAllAnnouncement = (req, res) =>{
    Announcement.find().exec((err, announcements) => {
        if(err){
            return res.status(400).json({
                error: "No announcements found"
            });
        }
        res.json(announcements);
    });
};

exports.removeAnnouncement = (req, res) => {
    const announcement = req.announcement;

    announcement.remove((err, announcement) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete this announcement"
            });
    }
    res.json({
        message: `Successfully deleted ${announcement}`
    });
   });
};