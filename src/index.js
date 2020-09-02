const express = require('express');
// const bcrypt = require('bcryptjs');
require('./db/mongoose.js');
const jwt = require('jsonwebtoken');

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

// hashing a password

// const myFun = async () => {
//     const token = jwt.sign({ _id: 'abc123'}, 'test123', { expiresIn: '7 days'})
//     console.log(token);

    

//     console.log(jwt.verify(token, 'test123'))
// }

// myFun();

// configuring the port

app.listen(port, ()=>{
    console.log('Server started on port '+port)
})