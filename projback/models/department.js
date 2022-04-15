const mongoose = require('mongoose');


const departmentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
  },
  {timestamps:true}
);


module.exports = mongoose.model("Department",departmentSchema);