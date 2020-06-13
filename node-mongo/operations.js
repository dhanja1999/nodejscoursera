const assert = require('assert');

exports.insertDocument = function(db, document,collection,callback){
    const coll = db.collection(collection);
    coll.insertOne(document, function(err, result){
        assert.equal(err,null);
        console.log("Inserted "+result.result.n+" documents into the collection "+collection);
        callback(result);   
    });
};

exports.findDocuments = function(db,collection,callback){
    const coll = db.collection(collection);
    coll.find({}).toArray(function(err,docs){
        assert.equal(err,null);
        callback(docs);
    });
};

exports.removeDocument = function(db, document,collection,callback){
    const coll = db.collection(collection);
    coll.deleteOne(document,function(err,result){
        assert.equal(err, null);
        console.log("removed the document ", document);
        callback(result);
    });
};

exports.updateDocument = function(db, document,update,collection,callback){
    const coll = db.collection(collection);
    coll.updateOne(document,{ $set: update},null,function(err,result){
        assert.equal(err,null);
        console.log("Updated the document with : ", update);
        callback(result);
    });
};