var task = require('../models/Task');
var _ = require('lodash');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var multer = require('multer');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

var getAll = (req, res, next) => {
    task.find().sort('createdAt')
        .then((data) => {
            res.status(202).json(data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};
var getById = (req, res, next) => {
    task.findOne({"_id": req.params.id})
        .then((data) => {
            res.status(202).json(data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};
var confirme = (req, res, next) => {
    task.findOneAndUpdate({"_id": req.params.id}, {$set: {'status': 'DONE'}})
        .then((data) => {
            res.status(202).json(data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};
var updateTask = (req, res, next) => {
    const updateData = req.body;
    if (!updateData) {
        res.status(422).send({"message": "please provide what you want to update"})
    }
    task.findOne({"_id": req.params.id}).then(function (t) {
        if (!t) {
            return res.sendStatus(401);
        }
        if (typeof updateData.title !== 'undefined') {
            t.title = updateData.title;
        }
        if (typeof updateData.description !== 'undefined') {
            t.description = updateData.description;
        }
        if (typeof updateData.status !== 'undefined') {
            t.status = updateData.status;
        }
        if (typeof updateData.priority !== 'undefined') {
            t.priority = updateData.priority;
        }
        if (typeof updateData.createdAt !== 'undefined') {
            t.createdAt = updateData.createdAt;
        }
        // if (typeof updateData.responsible !== 'undefined') {
        //     t.responsible = updateData.responsible;
        // }
        return t.save()
            .then(function () {
                return res.json({t: t});
            });
    }).catch(() => {
            res.status(422).send({"message": "couldn't update task"})
        }
    );
};
var add = async (req, res, next) => {
    task.create({
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        createdAt: new Date(),
    }).then((data) => {
        res.set('Content-Type', 'application/json');
        res.status(202).json(data);
    })
    .catch(error => {
        console.log(error);
        res.set('Content-Type', 'application/json');
        res.status(500).send(error);
    });
};
var deleteTask = (req, res, next) => {
    task.deleteOne({"_id": req.params.id})
        .then(() => {
            res.set('Content-Type', 'application/json');
            res.status(202).send({"status": "success", "message": "The task Was Deleted Successfully !"});
        })
        .catch(error => {
            res.set('Content-Type', 'application/json');
            console.log(error);
            res.status(500).send(error);
        });
};

module.exports = {
    getAll,
    getById,
    updateTask,
    add,
    deleteTask,
    confirme,
};
