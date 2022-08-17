const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/menRegistration',{
    // useNewUrlParser:true,
    // useUnifiedTopology:true,
    // useCreateIndex:true
}).then(()=>{
    console.log("Cool! Connection successful");
}).catch((e)=>{
    console.log("Sorry! No Connection\n",e);
})