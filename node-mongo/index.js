const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');
 
const url = 'mongodb://localhost:27017';
 const dbname = 'conFusion';

 MongoClient.connect(url,{useUnifiedTopology: true} )
    .then(function(client){
        console.log("Connected correctly to the server ");
        const db = client.db(dbname);
        
        dboper.insertDocument(db,{name:"vdonut",description:"Testing"}, 'dishes')
            .then(function(result){
                console.log("Insert document: \n", result.ops);
                return dboper.findDocuments(db,'dishes')
            })
            .then(function(docs){
                console.log("Found documents:\n", docs);
                return dboper.updateDocument(db,{name:'vdonut'},{description:"updated descr"},'dishes')
            })
            .then(function(result){
                console.log('Updated document: \n',result.result);
                return dboper.findDocuments(db,'dishes')
            })
            .then(function(docs){
                console.log('Found Updated documents:\n',docs);
                return db.dropCollection('dishes');
            })
            .then(function(err){
                console.log('Dropped collection : ', err);
                return client.close();
            })
            .catch((err)=> console.log(err))
    })
    .catch((err)=> console.log(err))