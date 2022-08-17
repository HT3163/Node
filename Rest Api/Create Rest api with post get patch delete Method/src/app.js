const express = require('express')
const app = express()
const port = process.env.PORT || 8000;

require('./db/connection');
const Student = require('./models/students.js')

app.use(express.json());  //why use explain in last below comment if not write than console.log(req.body); in post give ouptup: undefined

// get data from database
app.get('/students', async(req, res) => {

  try{
    const studentsData = await Student.find();
    res.send(studentsData); 
  }catch(e){
    console.log(e);
  }

})

app.get('/students/:name', async(req, res) => {

  try{
    const namee = req.params.name;    //params can be used to get url data if someone enter in the url

    const studentsData = await Student.find({name:namee});  //SAME AS: Student.findById({_id:_id});

    if(!studentsData){
      return res.status(404).send('Not Correct url');
    }else {
      res.status(500).send(studentsData);
    }

    
  }catch(e){
    console.log(e);
  }

})

//can be used to delete document from database
app.delete('/students/:id', async(req, res) => {

  try{
    const _id = req.params.id;    //params can be used to get url data if someone enter in the url

    const deleteStudent = await Student.findByIdAndDelete(_id);  //SAME AS: Student.findById({_id:_id});

    if(!deleteStudent){
      return res.status(404).send('Not Correct url');
    }else {
      res.status(500).send(deleteStudent);
    }

    
  }catch(e){
    res.status.name(500).send(e);
  }

})


//can be used to update document from database
app.patch('/students/:id', async(req, res) => {

  try{
    const _id = req.params.id;    //params can be used to get url data if someone enter in the url

    const updateStudents = await Student.findByIdAndUpdate(_id, req.body, {   //SAVE AS: (_id, {$set: req.body}
      new:true  //new:true : display new updateted document in terminal
    }); 

    res.send(updateStudents);

  }catch(e){
    res.status(400).send(e);
  }

})


// With  Async Await Method
// create document in database using postman
app.post('/students', async (req, res) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (e) {
    res.status(400).send(e);
  }
})



// With Promise Method 
// create document in database using postman
// app.post('/students', (req, res) => {
//   // console.log(req.body);
//   const user = new Student(req.body);
//   user.save().then(() => {
//     // res.status(201);
//     // res.send(user); 
//     res.status(201).send(user);  //short cut of above two line
//   }).catch((e) => {
//     res.status(400).send(e);
//   })

//   // res.send('hello from the other sides');

// })




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

