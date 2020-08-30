require('../src/db/mongoose');
const Task = require('../src/models/task');

// Delete 
// Task.findByIdAndDelete('5f4504d34a39fd7b53a168c6').then((task)=> {
//     console.log(task, ' Deleted');
//     return Task.countDocuments({completed: false})
// }).then((count)=> {
//     console.log('count--', count);
// }).catch((error) => {
//     console.log(error);
// })

// using async await
 
const deleteAndCount = async (id) => {
    const deleteRecord = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed: false});
    return count;
}

deleteAndCount('5f44fad4c4d383761e67349a').then((count) => {
    console.log(count);
}).catch((error) => {
    console.log('Some Error came up', error);
})