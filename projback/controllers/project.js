const { Project, Users } = require("../models/project");

exports.getProjectById = (req, res, next, id) => {
    Project.findById(id)
    .populate("Users.user", "name")
    .exec((err, project) => {
        if(err){
            return res.status(400).json({
                error: "No Project found in DB"
            });
        }
        req.project = project;
        next();
    });
};

exports.createProject = (req,res) => {
    req.body.project.user = req.profile;
    const project = new Project(req.body.project)
    project.save((err, project)  => {
        if(err){
            return res.status(400).json({
                error: "Failed to save your project in DB"
            })
        }
        res.json(project);
    });
};

exports.getAllProjects = (req,res) => {
    Project.find()
    .populate("user", "_id name")
    .exec((err, project) => {
        if(err){
            return res.status(400).json({
                error: "No projects found in DB"
            });
        }
        res.json(project);
    });
};

exports.deleteProject = (req, res) => {
    let project = req.project;

    project.remove((err,deletedProject) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete the project"
            });
        }
        res.json({
            message: "Deletion was a success",
            deletedProject
        })
    })
}

