var mongoose = require('mongoose');

var taskSchema = mongoose.Schema(
    {
        title: {type: String, unique: false, required: true, index: true, text: true},
        description: {type: String, unique: false, required: true, index: true, text: true},
        status: {type: String, unique: false, enum: ["TODO", "DONE"], default: "TODO" , required: true},
        createdAt: {type: Date, unique: false, required: false},
    });
var task = mongoose.model('Task', taskSchema);
module.exports = task;
