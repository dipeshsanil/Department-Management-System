const Department = require("../models/department")

exports.getDepartmentById = (req, res, next, id) => {
    Department.findById(id).exec((err, department) => {
        if(err){
            return res.status(400).json({
                error: "Department not found in DB"
            })
        }
        req.department = department;
        next();
    });
};

exports.createDepartment = (req, res) => {
    const department = new Department(req.body);
    department.save((err, department) => {
        if(err){
            return res.status(400).json({
                error: "Not able to save department in DB"
            });
    }
    res.json({ department });
   });
};

exports.getDepartment = (req, res) =>{
    return res.json(req.department);
};

exports.getAllDepartment = (req, res) =>{
    Department.find().exec((err, departments) => {
        if(err){
            return res.status(400).json({
                error: "No departments found"
            });
        }
        res.json(departments);
    });
};

exports.updateDepartment = (req, res) => {
    const department = req.department;
    department.name = req.body.name;

    department.save((err, updateDepartment) => {
        if(err){
            return res.status(400).json({
                error: "Failed to update department"
            });
    }
    res.json(updateDepartment);
   });
};

exports.removeDepartment = (req, res) => {
    const department = req.department;

    department.remove((err, department) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete this department"
            });
    }
    res.json({
        message: `Successfully deleted ${department}`
    });
   });
};