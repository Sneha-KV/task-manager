const express = require('express');
require('./db/mongoose.js');
const User = require('./models/user.js') 
const Task = require('./models/task.js') 


const app = express();
const port = process.env.PORT || 3000;

// access request structure
app.use(express.json())

// User post request - create user
app.post('/users', (req, res)=> {
    const user = new User(req.body);
    console.log(req.body);
    user.save().then(()=>{
        res.status(201).send(user);
    }).catch((error)=> {
        res.status(400).send(error)
        
    });
})

// Read -> Get all USERS
app.get('/users', (req, res)=> {
    User.find({}).then((users)=> {
        res.send(users)
    }).catch((error) => {
        res.status(500).send('Service Down')
    })
});

// Read -> Get one user

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    User.findById(_id).then((user)=> {
        if(!user) {
            return res.status(404).send('User not found');
        }

        res.send(user);
    }).catch((error) => {
        res.status(404).send(error)
    })
})

// Create Task - POST call
app.post('/tasks', (req, res) => {
    const task = new Task(req.body);
    console.log(req.body);

    task.save().then(()=> {
        res.status(201).send(task);
    }).catch((error) => {
        res.status(400).send(error);
    })
})

// read tasks - GET call
app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }).catch((error) => {
        res.status(500).send(error)
    })
})

// read tasks - GET call
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id
   Task.findById(_id).then((task)=> {
    if(!task) {
        return res.status(400).send('User not found');
    }
        res.send(task);
   }).catch((error)=> {
       res.status(400).send('User Not found')
   })
})


app.listen(port, ()=>{
    console.log('Server started on port '+port)
})