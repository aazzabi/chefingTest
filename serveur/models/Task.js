var mongoose = require('mongoose');

var taskSchema = mongoose.Schema(
    {
        title: {type: String, unique: false, required: true, index: true, text: true},
        description: {type: String, unique: false, required: true, index: true, text: true},
        status: {type: String, unique: false, enum: ["WAITING", "IN_PROGRESS", "RESOLVED", "CONFIRMED"], default: "WAITING" , required: true},
        priority: {type: String, unique: false, enum: ["LOW", "NORMAL", "IMPORTANT", "CRITICAL"],  required: true},
        createdAt: {type: Date, unique: false, required: false},
        createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: false},
        responsible: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: false},
    });
var task = mongoose.model('Task', taskSchema);
module.exports = task;
