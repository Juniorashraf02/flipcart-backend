

const mongoose = require('mongoose');

exports.databaseConnect = function dbconnect(){
    mongoose.connect(`${process.env.DATABASE}`).then(()=>{
        console.log(`Database connected...!!!`.bold.blue);
    })
};