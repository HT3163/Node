// routing means we can use home,about, contact us page to load in the browser
// when we click home   OUTPUT: give home page
// when we about home   OUTPUT: give about page         etc.


const express = require('express')
const app = express();
const port = 8000;

//  syntax: app.get('route', (callback)=>{}); 

// For Home Page
app.get('/', (req,res)=>{
    // res.status(200).send('welcome to my home page');

    // in express it's not compuslory to wirte status code,Content-Type becaue express js do this work automatically

    res.send('welcome to my home page');
})

// For About Page
app.get('/about', (a,b)=>{   //it's not compulsory to wirte (req,res) name you can also change the name of req and res but name change is possible but the request all ways lie the first parameter name
    b.send('welcome to my about page');
})

app.listen(port,()=>{
    console.log(`listening to the port no ${port}`);
})
