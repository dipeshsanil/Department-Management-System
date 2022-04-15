const User = require("../models/user");
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');


exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }
        req.profile = user;
        next();
    });
};

exports.getUser = (req,res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
}

exports.updateUser = (req,res) => {
    if(req.body.password){
        req.body.salt=uuidv4();
        req.body.encry_password = crypto
        .createHmac("sha256", req.body.salt)
        .update(req.body.password)
        .digest("hex");
    }
    User.findByIdAndUpdate(
        {_id: req.profile._id },
        { $set: req.body},
        {new: true, useFindAndModify: false},
        (err, user) => {
            if(err) {
                return res.status(400).json({
                    err: "You are not authorized to update this user"
                });
            }
            user.salt = undefined;
            user.encry_password = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            return res.json(user);
        }
    )
}

exports.deleteUser = (req, res) => {
    let user = req.profile;

    user.remove((err,deletedUser) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete the user"
            });
        }
        res.json({
            message: "Deletion was a success",
            deletedUser
        })
    })
}

exports.getUser= (req, res) =>{
    return res.json(req.profile);
};

exports.getAllUser = (req, res) =>{
    User.find().exec((err, users) => {
        if(err){
            return res.status(400).json({
                error: "No users found"
            });
        }
        res.json(users);
    });
};