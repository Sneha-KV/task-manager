const mongoose = require('mongoose');

// creating tasks model - Mongoose takes model name , converts it to plural & makes it plural, Task-> tasks
const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // model name
    }
});

module.exports = Task;