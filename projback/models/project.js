const mongoose = require('mongoose');
const{ ObjectId } = mongoose.Schema;

const UsersSchema = new mongoose.Schema({
  user: {
      type: ObjectId,
      ref: "User"
  },
  name: String
},
);

const Users = mongoose.model("Users",UsersSchema);

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    users: [UsersSchema],
    user: {
      type: ObjectId,
      ref: "User"
    }
  },
  {timestamps:true}
);


const ProjectSchema = mongoose.model("Project",ProjectSchema);

module.exports = { Project, Users };
