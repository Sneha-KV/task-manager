const mongoose = require('mongoose');

const connectionUrl = 'mongodb://127.0.0.1:27017/task-manager-api';

// create connection
mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})




// const task1 = new Task({ description: '  Learn mongo db  '});
// task1.save().then(()=> {
//     console.log(task1);
// }).catch((error)=> {
//     console.log('Error---',error)
// })

