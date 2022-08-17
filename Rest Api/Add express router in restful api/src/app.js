const express = require('express')
const app = express()
const port = process.env.PORT || 8000;

require('./db/connection');
const studentRouter = require('./router/student.js')
  
app.use(express.json());  //why use explain in last below comment if not write than console.log(req.body); in post give ouptup: undefined
app.use(studentRouter);
  

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:port`)
})

// You do not need express.json() and express.urlencoded()
// for GET Requests or delete requests. We only need it for
// post and put(patch) req

// express.json() is a method inbuilt in express to recognize the
// incoming request object as a json object. this method is called as
// middleware in your application using the
// code: app.use(express.json());

