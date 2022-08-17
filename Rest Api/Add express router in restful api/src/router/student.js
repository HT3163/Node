const express = require('express')
const router = new express.Router();
const Student = require('../models/students')

router.get('/students', async(req, res) => {

  try{
    const studentsData = await Student.find();
    res.send(studentsData); 
  }catch(e){
    console.log(e);
  }

})

router.get('/students/:name', async(req, res) => {

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
router.delete('/students/:id', async(req, res) => {

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
router.patch('/students/:id', async(req, res) => {

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
router.post('/students', async (req, res) => {   //post means create document
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (e) {
    res.status(400).send(e);
  }
})


module.exports = router;