# task-manager

/Users/skasugantivenkata/mongodb/bin/mongod --dbpath=/Users/skasugantivenkata/mongodb-data
db.collection('name');
db.collection('name').insertOne(record,callback)
                     .insertMany()
                     .findOne() ->FindOne always returns the first match
                     .find() -> returns cursor/ pointer to the records

                     
object ID (_id) in Mongo db records:

4 byte -> time stamp
5 bytes -> random vaalue
3 byte -> counter starting with random value

ID is stored in binary format as string takes almost double storage to store

