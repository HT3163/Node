const express = require('express')
const path = require('path');
const hbs = require('hbs');
const app = express()
const port =  process.env.PORT || 8000;

require('./db/conn.js');
const Register = require('./models/registers');
const async = require('hbs/lib/async');

const static_path = path.join(__dirname, "../public");  // For includeing public folder
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
// console.log(partials_path);

app.use(express.json()); 
app.use(express.urlencoded({extended:false})); //if not use than console.log(req.body.firstname); give undefined

app.use(express.static(static_path));  //if use this line than render() give priority to publice folder instead of templates folder
app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partials_path);

app.get('/', (req, res) => {
//   res.send('index')    //not work if file is index.hbs
//   res.send(index)      //work if file is index.html
  res.render('index')     //work if file is index.hbs
//   res.render('index')  //work if file is index.html
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async(req,res)=>{
    try{

        console.log(req.body.firstname);
        console.log(req.body.lastname);
        console.log(req.body.email);
        console.log(req.body.phone);
        console.log(req.body.textarea);

        if(req.body.password === req.body.repassword){
          const registerEmployee = new Register({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              password: req.body.password,
              repassword: req.body.repassword,
              phone: req.body.phone,
              textarea: req.body.textarea
          })
          const registered = await registerEmployee.save();
          res.status(201).render('index');
        }else {
          res.send('Please! Enter Correct Password')
        }

    }catch(e){
        res.status(400).send(e);
    }
})

app.get('/login', (req, res) => {
  res.render('login');
})

app.post('/login', async(req, res) => {
    try{
      const email = req.body.email;
      const password = req.body.password;

      // console.log(password);
      const useremail = await Register.findOne({email:email});
      console.log(useremail.password);
      console.log(password);
      if(useremail.password == password){
        res.status(201).render('index');
      }else {
        res.send('password are not matching');
      }

    }catch(e){
      console.log("Not Work login post\n",e);
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:port`)
})
