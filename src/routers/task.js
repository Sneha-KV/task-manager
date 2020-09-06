const express = require('express');
const Task = require('../models/task');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

// Create Task - POST call
router.post('/tasks', auth , async (req, res) => {
    // const task = new Task(req.body);
    try {
        const task = new Task({
            ...req.body,
            owner: req.user._id
        })
        console.log(req.body);
        const newTask = await task.save();
        console.log(newTask);
        res.status(201).send(newTask);

    } catch (error) {
        res.status(400).send(error);
    }

})

// read tasks - GET call
// match - for filters
//GET /tasks?completed=false
// GET /tasks?limit=10&skip=5
// GET /tasks?sortBy=createdAt:asc 
router.get('/tasks', auth, async (req, res) => {
    const match = {},
    sort = {};

    if (req.query.completed) {
        match.completed = req.query.completed === 'true';
    }
    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }
    try {
        
   // populate the virtual tasks obj attribute with tasks
    await req.user.populate({
        path: 'tasks',
        match,
        options: {
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort
        }
    }).execPopulate();
        res.send(req.user.tasks);
    } catch (error) {
        res.status(500).send(error)
    }
  
})

// read tasks - GET call
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {

        // const task = await Task.findById(_id);
        const task = await Task.findOne({ _id, owner: req.user._id})
        if(!task) {
            return res.status(400).send('Task not found');
        }
        res.send(task);
    } catch (error) {
        res.status(404).send('Task Not found, Try again!');
    }


})

// Update Tasks

router.patch('/tasks/:id', auth, async (req, res) => {
    const reqUpdates = Object.keys(req.body);
    allowedUpdates = ['description','completed'];
    const isValidUpdate = reqUpdates.every((update)=> allowedUpdates.includes(update));
    if (!isValidUpdate) return res.status(400).send('Invalid update operation');
    try {
        const _id = req.params.id;
        const task = await Task.findOne({ _id, owner: req.user._id})
        // const task = await Task.findById(req.params.id);
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
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id});
        if (!task) return res.status(404).send('Task not found');
        res.send(task +" deleted sucessfully");
    } catch(error) {
        res.status(500).send(error);
    }
})

module.exports = router;