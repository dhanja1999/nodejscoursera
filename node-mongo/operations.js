const assert = require('assert');

exports.insertDocument = function(db, document,collection,callback){
    const coll = db.collection(collection);
    return coll.insertOne(document);
};

exports.findDocuments = function(db,collection,callback){
    const coll = db.collection(collection);
    return coll.find({}).toArray();
};

exports.removeDocument = function(db, document,collection,callback){
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};

exports.updateDocument = function(db, document,update,collection,callback){
    const coll = db.collection(collection);
    return coll.updateOne(document,{ $set: update},null);
};