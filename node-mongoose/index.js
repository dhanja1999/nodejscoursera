const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true });

connect.then((db)=>{
    console.log('Connected correctly to server ');
    Dishes.create({
        name:'Dhananjay',
        description: 'test'
    }
    )
    .then((dish)=>{
        console.log("\n first. .then stmt: \n");
        console.log(dish);
        return Dishes.findByIdAndUpdate(dish._id,{
            $set:{ description: "updated dish"}
        },{
            new: true
        }).exec();
    })
    .then((dish)=>{
        console.log("\n sec. .then stmt: \n");
        console.log(dish);
        dish.comments.push({
            rating:5,
            comment: "I'm getting a sinking feeling",
            author:'Leonardo di capaccio'
        });
        return dish.save();
    })
    .then((dish)=>{
        console.log("\n before removing: \n");
        console.log(dish);
        return Dishes.remove({});
    }) 
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch((err)=>{
        console.log(err);
    })
});