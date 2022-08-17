const express = require('express')
const app = express()
const port =  process.env.PORT || 8000;

require('./db/connection');
const Student = require('./models/students.js')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());  //why use explain in last below comment if not write than console.log(req.body); in post give ouptup: undefined

app.post('/students', (req, res) => {
    // console.log(req.body);
    const user = new Student(req.body);
    user.save().then(()=>{
        // res.status(201);
        // res.send(user); 
        res.status(201).send(user);  //short cut of above two line
    }).catch((e)=>{
        res.status(400).send(e);
    })

    // res.send('hello from the other sides');

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:port`)
})

// You do not need express.json() and express.urlencoded()
// for GET Requests or delete requests. We only need it for 
// post and put req

// express.json() is a method inbuilt in express to recognize the
// incoming request object as a json object. this method is called as 
// middleware in your application using the
// code: app.use(express.json());

