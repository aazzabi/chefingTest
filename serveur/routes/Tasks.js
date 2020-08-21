var express = require('express');
var router = express.Router();
var tasksController = require('../controllers/TasksController');

router.get('/', tasksController.getAll);
router.get('/:id', tasksController.getById);
router.post('/add', tasksController.add);
router.put('/confirme/:id', tasksController.confirme);
router.delete('/delete/:id', tasksController.deleteTask);

module.exports = router;
