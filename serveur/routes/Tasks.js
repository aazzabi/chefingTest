var express = require('express');
var router = express.Router();
var tasksController = require('../controllers/TasksController');

router.get('/', tasksController.getAll);
router.get('/:id', tasksController.getById);
// router.post('/add/:idUser', tasksController.add);

module.exports = router;
