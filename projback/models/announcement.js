const mongoose = require('mongoose');


const announcementSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
    },
  },
  {timestamps:true}
);


module.exports = mongoose.model("Announcement",announcementSchema);