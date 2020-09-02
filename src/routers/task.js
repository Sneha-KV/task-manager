const express = require('express');
const Task = require('../models/task');
const router = new express.Router();

// Create Task - POST call
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    console.log(req.body);

    try {
        const newTask = await task.save();
        console.log(newTask);
        res.status(201).send(newTask);

    } catch (error) {
        res.status(400).send(error);
    }

})

// read tasks - GET call
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error)
    }
  
})

// read tasks - GET call
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id);
        if(!task) {
            return res.status(400).send('User not found');
        }
        res.send(task);
    } catch (error) {
        res.status(404).send('User Not found, Try again!');
    }


})

// Update Tasks

router.patch('/tasks/:id',async (req, res) => {
    const reqUpdates = Object.keys(req.body);
    allowedUpdates = ['description','completed'];
    const isValidUpdate = reqUpdates.every((update)=> allowedUpdates.includes(update));
    if (!isValidUpdate) return res.status(400).send('Invalid update operation');
    try {
        const task = await Task.findById(req.params.id);
        reqUpdates.forEach((update) => task[update] = req.body[update]);

        await task.save();
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!task) {
            return res.staus(404).send();
        }
        res.send(task);
    } catch(error) {
        res.status(400).send(error)
    }
})

// Delete User 
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).send('Task not found');
        res.send(task);
    } catch(error) {
        res.status(500).send(error);
    }
})

module.exports = router;