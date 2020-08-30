require('../src/db/mongoose');
const User = require('../src/models/user');

// User.findOne({ name: "Sneha"}).then((user)=> {
//     console.log(user)
// }).catch(()=> {
//     console.log('Error')
// })

// User.findByIdAndUpdate('5f44fb5dc4d383761e67349b', { age: 17}).then((user)=> {
//     console.log(user);
//     return User.countDocuments({age: 17})
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error);
// })

const updateAgeAndCount = async (id, age) => {
    const findAndUpdate = await User.findByIdAndUpdate(id, {age});
    const count = await User.countDocuments({age});
    return count
} 

updateAgeAndCount('5f44fb5dc4d383761e67349b', 18).then((count) => {
    console.log(count);
}).catch((error) => {
    console.log('errorrr---', error)
})