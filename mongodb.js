// CRUD create read update delete
const {MongoClient, ObjectID} = require('mongodb')
// --- or -----
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;


const connectionURL = process.env.MONGODB_URL; // local host IP and port, 
const databaseName = 'task-manager';


// object Id generation
const id = new ObjectID();
// console.log(id,'----',id.getTimestamp());

//connecting to DB
MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology:true}, (error, client) => {
    // remove  useUnifiedTopology:true if it behaves wierdly 
    if(error) {
        return console.log('Unable to connect');
    }
    console.log('Connected to DB');
    const db = client.db(databaseName);

    // DELETE
    // const deleteOnePromise = db.collection('users').deleteOne({age: 23});
    // deleteOnePromise.then((result)=> {
    //     console.log(result);
    //     printDBvalues('users');
    // }).catch((error)=>{
    //     console.log(error,'----Error in deleting the record');
    // })

    //Delete Many
    const deleteManyPromise = db.collection('users').deleteMany({age: 29});
    deleteManyPromise.then((result)=> {
        console.log(result.deletedCount);
        printDBvalues('users');
    }).catch((error)=>{
        console.log(error,'----Error in deleting the record');
    })

    // UPDATE

    // const updatePromise = db.collection('tasks').updateOne({
    //     _id: new ObjectID('5f3d59f87d09abe31c7057b2')
    //     // description: ''
    // }, {
    //     $set: {
    //         description: 'Diary'
    //     }
    // })

    // updatePromise.then((result)=> {
    //     console.log(result.matchedCount);
    //     printDBvalues('tasks');
    // }).catch((error)=> {
    //     console.log(error,'----Error in updatinng the doc');
    // })

    // const updateManyPromise = db.collection('users').updateMany({age: '28'}, 
    //     {
    //         $set: {
    //             age: 28
    //         }
    //     }
    //     );

    // updateManyPromise.then((result)=> {
    //     console.log(result.modifiedCount)
    //     printDBvalues('users');
    // }).catch((error)=> {
    //     console.log(error,'----Error in updatinng the doc');
    // })


    // FIND / READ
    // db.collection('tasks').findOne({ _id: new ObjectID('5f3cd2c0d627b174414ea4c7')}, (error, user) => {
    //     if(error) {
    //         return console.log('Unable to fetch');
    //     }
    //     console.log(user,'-----');
    // });
    const printDBvalues = (dbName) => {    db.collection(dbName).find({ }).toArray((error, users) => {
        if(error) {
            return console.log('Unable to fetch');
        }
        console.log(users);
    }) }
 
    // db.collection('tasks').find({ completed: true }).count((error, count) => {
    //     if(error) {
    //         return console.log('Unable to fetch');
    //     }
    //     console.log(count);
    // });

    // CREATE / INSERT
    // insert one record
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Sneha',
    //     age: 23
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('oops! unable to connect');
    //     }
    //     console.log(result.ops);
    // })


    // creating new tasks application- multiple records
    // var tasksList = [{ description: 'Exercise', completed: true}, { description: 'Complete Node Course', completed: false},  { description: 'Green Tea', completed: true} ]
    // db.collection('tasks').insertMany(
    //     tasksList,
    //     (error, result) => {
    //         if(error) {
    //             return console.log('Oops! unable to create records');
    //         } else {
    //             console.log(result.ops);
    //         }
    //     }
    // )

  
})