const express = require('express');
require('./db/mongoose.js');
const User = require('./models/user.js') 
const Task = require('./models/task.js') 


const app = express();
const port = process.env.PORT || 3000;

// access request structure
app.use(express.json())

// User post request - create user
app.post('/users', async (req, res)=> {
    const user = new User(req.body);
    console.log(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(error)
    }

    // user.save().then(()=>{
    //     res.status(201).send(user);
    // }).catch((error)=> {
    //     res.status(400).send(error)
        
    // });
})

// Read -> Get all USERS
app.get('/users', async (req, res)=> {
    const getUsers = await User.find({});
    try {
        res.send(getUsers);
    } catch(error) {
        res.status(500).send('Service Down');
    }
});

// Read -> Get one user

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const findUser = await User.findById(_id);
        if(!findUser) {
                    return res.status(404).send('User not found');
                }
        
        res.send(findUser);
    } catch(error) {
        res.status(404).send('Sommething is wrong with the search, try again');
    }

})

// Update a user
app.patch('/users/:id', async (req, res) => {
    const _id = req.param.id;
    try {
        const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true});
        if (!user) {
            res.status(404).send('User Not Found')
        }

        res.send(user);
    } catch(error) {
        res.status(400).send(error)
    }
})


// Create Task - POST call
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    console.log(req.body);

    try {
        const newTask = await task.save();
        res.status(201).send(newTask);

    } catch (error) {
        res.status(400).send(error);
    }

})

// read tasks - GET call
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error)
    }
  
})

// read tasks - GET call
app.get('/tasks/:id', async (req, res) => {
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


app.listen(port, ()=>{
    console.log('Server started on port '+port)
})