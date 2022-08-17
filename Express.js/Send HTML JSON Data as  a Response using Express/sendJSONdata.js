const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => {
//   res.send('<h1>Welcome To Home Page</h1>');    //sending html file by writing
  res.write('<h1>Welcome To Home Page</h1>');   //In wirte() connection can't be stop because he taking data and data and so on;
  res.write('<h1>Welcome To Second home Page</h1>'); //when we use res.wirte() the connection can't be stop    
  res.end();                                 //so wirte res.end() to stop connection;
})

// send object in express
app.get('/sendObject', (req, res) => {
    res.send({
        id: 1,
        name: 'Hamza'
    });  //Object automatically converting into json file in our browser Remember that!
})

// send array of object in express
app.get('/sendArrayOfObject', (req, res) => {
    /*res.send([
        {
            id: 1,
            name: 'Hamza'
        },
        {
            id: 2,
            name: 'Qasim'
        }
    ]);*/
    res.json([            //we write json instead of send
        {                //Those methods res.send() and res.json() are identical(same) when an object or array is passed, but res.json() will also convert non-object, such as null and undefined, which are not valid JSON.
            id: 1,       //res.json method. it accepts an object and coverts it into JSON before sending it as a response.
            name: 'Hamza'
        },
        {
            id: 2,
            name: 'Qasim'
        }
    ]);
})

app.get('/about', (req, res) => {
    res.send('welcome to about the page');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})