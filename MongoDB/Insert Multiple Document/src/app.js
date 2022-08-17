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
        author: String,
        active: Boolean,
        date: {
            type: Date,
            default: Date.now
        }
    }
)

// in simple word model help us to create collections
const PlaylistModel = new mongoose.model("PlayList",playlistSchema)

// Create Multiple document with async await
const createdocument = async () => {

    try{

        const ReactPlaylist = new PlaylistModel(
            {
                name: "React JS",
                videos: 0,
                author: "ProgrammingWithHT",
                active: true,
            }
        )
        const NodePlaylist = new PlaylistModel(
            {
                name: "Node JS",
                videos: 30,
                author: "ProgrammingWithHT",
                active: true,
            }
        )
        const ExpressPlaylist = new PlaylistModel(
            {
                name: "Express JS",
                videos: 10,
                author: "ProgrammingWithHT",
                active: true,
            }
        )

        const result = await PlaylistModel.insertMany([ReactPlaylist,NodePlaylist,ExpressPlaylist])
        console.log(result)  //if we do without async await in our above code it's give pending instead of document in our terminal so await get all data from database and than save to variable result

    }catch(err){console.log(err)};

}
createdocument()