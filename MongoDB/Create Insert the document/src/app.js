// mongoose can be used to connect mongodb with nodejs and expressjs
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/qasim')  //qasim is database if not have any database than automatically created database with name qasim
.then(()=>{ console.log('connection is on the success')})
.catch((err)=>{console.log(err)})

// schema:
// A Mongoose schema defines the structure of the document,
// default values, validators, etc.

// in simple word schema can be to define data type of collections
const playlistSchema = new mongoose.Schema(
    {
        // name: String,
        name: {
            type: String,
            required: true    //these are our validators required = true means these name compulsory to wirte
        },
        videos: Number,
        active: Boolean,
        date: {
            type: Date,
            default: Date.now
        }
    }
)

// Model:
// a mongoose model is a wrapper on the mongoose schema.
// amoongoose schema defines the structure of the document,
// default values, validators, etc., whereas a mongoose model 
// provides an interface to database for creating,
// querying, updating, deleting records, etc.
// in simple word model help us to create collections

//            Syntax: new mongoose.model("collectionName",addSchema)
// collection creation
const PlaylistModel = new mongoose.model("PlayList",playlistSchema)


// Create First document
/*const reactPlaylist = new PlaylistModel(
    {
        name: "React JS",
        videos: 5,
        active: true,
        // date: {
        //     type: Date,
        //     default: Date.now
        // }  not compulsory to give date value because it's default value we give
    }
)
reactPlaylist.save();*/ //Do save work with async await

// Create First document with async await
const createdocument = async () => {

    try{

        const reactPlaylist = new PlaylistModel(
            {
                name: "Node JS",
                videos: 50,
                active: true,
            }
        )
        const result = await reactPlaylist.save() 
        console.log(result)  //if we do without async await in our above code it's give pending instead of document in our terminal so await get all data from database and than save to variable result

    }catch(err){console.log(err)};

}
createdocument()