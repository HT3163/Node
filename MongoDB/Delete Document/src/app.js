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

// Logical
// Name
// Description
// $and
// Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
// $not
// Inverts the effect of a query expression and returns documents that do not match the query expression.
// $nor
// Joins query clauses with a logical NOR returns all documents that fail to match both clauses.
// $or
// Joins query clauses with a logical OR returns all documents that match the conditions of either clause.

// Get Data from database
const getDocument = async () =>{
    // const result = await PlaylistModel.find({videos: {$gt:50}},{name: 1});   //Display those value whoes greater than 50
    // const result = await PlaylistModel.find({ctype: {$in:["Back End"]}},{name: 1});
    // const result = await PlaylistModel.find({ctype: {$in:["Back End", "Front End"]}},{name: 1});   //pass multiply value as a array to search by text this is the benifit of $in operator
    // const result = await PlaylistModel.find({ctype: {$nin:["Back End", "Front End"]}},{name: 1});   //$nin stand for "not in" display value whose value is not a Front and Back end
    // const result = await PlaylistModel.find({$or: [ {ctype: "Front End"}, {name: "Node Js"}]},{name: 1});   //compare tow or more value with or operator
    // const result = await PlaylistModel.find().count();   //count can be used to count document Remember! count is deprecated so we used countDocuments
    // const result = await PlaylistModel.find().countDocuments();   //count can be used to count document
    const result = await PlaylistModel.find({active: true}).sort({name:1});   //name:1 in sort means display in ascending order OR name:-1 in decending order
    console.log(result);
}
// getDocument();

// Update Document
const updateDocument = async (id) =>{

    try{
        // const result = await PlaylistModel.updateOne({_id:id},     
        const result = await PlaylistModel.findByIdAndUpdate({_id:id},  //return current data after update
        {
            $set: {
                name: "React JS"
            }
        },{
            new: true   //write new equal true give update data document not give this time current data
        })
        console.log(result)

    }catch(err){console.log(err)}

}

// updateDocument("6189a04d6b59b8660692a344");


// Delete Document

const deleteDocument = async (_id)=>{  //{_id} same as {_id:_id}
    try{
        // const result = await PlaylistModel.deleteOne({_id})   //delete one full document
        const result = await PlaylistModel.findByIdAndDelete({_id})   //delete one full document and display delete document
        console.log(result)
    }catch(err){console.log(err)}
}

deleteDocument("6189a04d6b59b8660692a345");

