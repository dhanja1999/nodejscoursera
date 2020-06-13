const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');
 
const url = 'mongodb://localhost:27017';
 const dbname = 'conFusion';

 MongoClient.connect(url, function(err, client){
    assert.equal(err,null);
    console.log("Connected correctly to the server ");
    const db = client.db(dbname);
    
    dboper.insertDocument(db,{name:"vdonut",description:"Testing"}, 'dishes',function(result){
        console.log("Insert document: \n", result.ops);
        dboper.findDocuments(db,'dishes',function(docs){
            console.log("Found documents:\n", docs);

            dboper.updateDocument(db,{name:'vdonut'},{description:"updated descr"},'dishes',function(result){
                console.log('Updated document: \n',result.result);
            });

            dboper.findDocuments(db,'dishes',function(docs){
                console.log('Found Updated documents:\n',docs);
                db.dropCollection('dishes',function(err){
                    console.log('Dropped collection : ', err);
                    client.close();
                });
            });
        });
    });
 });