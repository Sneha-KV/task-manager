// CRUD create read update delete

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017'; // local host IP and port, 
const databaseName = 'task-manager';
//connecting to DB
MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology:true}, (error, client) => {
    // remove  useUnifiedTopology:true if it behaves wierdly 
    if(error) {
        return console.log('Unable to connect');
    }
    console.log('Connected to DB');
    const db = client.db(databaseName);

    // insert one record
    // db.collection('users').insertOne({
    //     name: 'Sneha',
    //     age: 23
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('oops! unable to connect');
    //     }
    //     console.log(result.ops);
    // })

    // insert multiple records

    // db.collection('users').insertMany(
    //     [
    //         {
    //             name: 'Rama',
    //             age: 24
    //         }, {
    //             name: 'Lahari',
    //             age: 16
    //         }
    //     ],
    //     (error, result) => {
    //         if(error) {
    //             return console.log('oops! unable to connect');
    //         }

    //         console.log(result.ops);
    //     }
    // )

    // creating new tasks application
    var tasksList = [{ description: 'Exercise', completed: true}, { description: 'Complete Node Course', completed: false},  { description: 'Green Tea', completed: true} ]
    db.collection('tasks').insertMany(
        tasksList,
        (error, result) => {
            if(error) {
                return console.log('Oops! unable to create records');
            } else {
                console.log(result.ops);
            }
        }
    )
})