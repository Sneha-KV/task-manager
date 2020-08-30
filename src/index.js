const express = require('express');
require('./db/mongoose.js');
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


// configuring the port

app.listen(port, ()=>{
    console.log('Server started on port '+port)
})