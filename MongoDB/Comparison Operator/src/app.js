// mongoose can be used to connect mongodb with nodejs and expressjs
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/qasim')  //qasim is database if not have any database than automatically created database with name qasim
.then(()=>{ console.log('connection is on the success')})
.catch((err)=>{console.log(err)})


// in simple word schema can be to define data type of collections
const playlistSchema = new mongoose.Schema(
    {
        // name: String,
        name: {
            type: String,
            required: true    //these are our validators required = true means these name compulsory to wirte
        },
        videos: Number,
        ctype: String,
        active: Boolean,
        date: {
            type: Date,
            default: Date.now
        }
    }
)

// in simple word model help us to create collections
const PlaylistModel = new mongoose.model("PlayList",playlistSchema)

// For comparison of different BSON type values, see the specified BSON comparison order.

// Name
// Description
// $eq
// Matches values that are equal to a specified value.
// $gt
// Matches values that are greater than a specified value.
// $gte
// Matches values that are greater than or equal to a specified value.
// $in
// Matches any of the values specified in an array.
// $lt
// Matches values that are less than a specified value.
// $lte
// Matches values that are less than or equal to a specified value.
// $ne  
// Matches all values that are not equal to a specified value.
// $nin
// Matches none of the values specified in an array.

// Get Data from database
const getDocument = async () =>{
    // const result = await PlaylistModel.find({videos: {$gt:50}},{name: 1});   //Display those value whoes greater than 50
    // const result = await PlaylistModel.find({ctype: {$in:["Back End"]}},{name: 1});
    // const result = await PlaylistModel.find({ctype: {$in:["Back End", "Front End"]}},{name: 1});   //pass multiply value as a array to search by text this is the benifit of $in operator
    const result = await PlaylistModel.find({ctype: {$nin:["Back End", "Front End"]}},{name: 1});   //$nin stand for "not in" display value whose value is not a Front and Back end
    console.log(result);
}
getDocument();