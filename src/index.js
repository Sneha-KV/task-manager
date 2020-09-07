const express = require('express');
// const bcrypt = require('bcryptjs');
require('./db/mongoose.js');
const jwt = require('jsonwebtoken');
const path = require('path');
const hbs = require('hbs');
const multer = require('multer');

const User = require('./models/user.js') 
const Task = require('./models/task.js') 
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')


const app = express();
const port = process.env.PORT || 3000;

// access request structure
app.use(express.json());
app.use(userRouter); // accessing User Route
app.use(taskRouter); // accessing Task Route

// Client side incorporation - templates, styling, client side js
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views' );
const partialsPath = path.join(__dirname, '../templates/partials');

// setting up handle bars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// set up static directory
app.use(express.static(publicDirectoryPath));

// setting up dynamic templates
app.get('', (req, res) => {
    res.render('index', {
        name: 'Sneha',
        title: 'TASK MANAGER'
    })
})

// File upload using multer
// 

app.listen(port, ()=>{
    console.log('Server started on port '+port)
})

// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb){
//         if(!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('Please upload doc file'))
//         }

//         return cb(undefined, true);
//     }
// });

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send();
// }, (error, req, res, next)=> {
//     res.status(400).send({error: error.message});
// })

// const Task = require('./models/task');

// const main = async () => {
    // Get User from task
    // const task = await Task.findById('5f4fd74c92c17b2dbd7b624d');
    // await task.populate('owner').execPopulate()

    // console.log(task.owner);

    // Get Tasks from USER - Method 1
    // const user = await User.findById('5f4bda07a1af61f39e7b82f3');
    // const owner = user._id
    // const tasks1 = await Task.find({owner});
    // console.log(tasks1)

    // Get Tasks from USER - Method 2, using virtual type

    // const user = await User.findById('5f4bda07a1af61f39e7b82f3');
    //  await user.populate('tasks').execPopulate();

    // console.log(user.tasks)

// }

// main()



// hashing a password

// const myFun = async () => {
//     const token = jwt.sign({ _id: 'abc123'}, 'test123', { expiresIn: '7 days'})
//     console.log(token);
//     console.log(jwt.verify(token, 'test123'))
// }

// myFun();

// var test = {name: "Hell"}
// test.toJSON  = function() {
//     return { name: "Yess"}
// }
// console.log(JSON.stringify(test))
// configuring the port

