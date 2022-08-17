require('dotenv').config();
const express = require('express')
const path = require('path');
const hbs = require('hbs');
const bcrypt = require('bcryptjs');
const app = express()
const port =  process.env.PORT || 8000;

require('./db/conn.js');
const Register = require('./models/registers');
const async = require('hbs/lib/async');
const { registerPartial } = require('hbs');
const { cookie } = require('express/lib/response');

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


// console.log(process.env.SECRET_KEY);
console.log(process.env.DBNAME);


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

        // console.log(req.body.firstname);
        const passwordHash = await bcrypt.hash(req.body.password, 10);
        
        if(req.body.password === req.body.repassword){
          const registerEmployee = new Register({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: passwordHash,
            repassword: passwordHash,
            phone: req.body.phone,
            textarea: req.body.textarea
          })

          const token = await registerEmployee.generateAuthToken();

          //The res.cookie() function is used to set the cookie name to value.
          // The value parameter may be a string or object converted to JSON.

          //  Syntax: 
          //    res.cookie(name, value, [options]); in-built in js
          res.cookie('jwt',token, {
            expires: new Date(Date.now() + 50000),  //cookie remove automatically after 5second == 50000ms
            httpOnly:true,  //client-side programmer not remove our cookie
            // secure:true   work only when our connections is https || use to secure cookie
          });  //store token in web cookie || jwt is just name of cookie that store in web browser you can also uesd another name
          
          const registered = await registerEmployee.save();

          res.status(201).render('index');
        }else {
          res.send('Please! Enter Correct Password')
        }

    }catch(e){
        res.status(400).send(e);
        console.log('The Error In Post Registers\n',e)
    }
})

app.get('/login', (req, res) => {
  res.render('login');
})

app.post('/login', async(req, res) => {
    try{
      const email = req.body.email;
      const password = req.body.password;

      const useremail = await Register.findOne({email:email});
      
      const passwordmatch = await bcrypt.compare(password, useremail.password);  //if match return 1 else return 0

      const token = await useremail.generateAuthToken();
      // console.log('the token part: ',token)

      res.cookie('loginToken',token);

      if(passwordmatch){
        res.status(201).render('index');
      }else {
        res.send('password are not matching');
      }

    }catch(e){
      console.log("Not Work login post\n",e);
    }
})

// Bacic syntax how to use hashing
// const bcrypt = require('bcryptjs');
// const securePassword = async (password)=>{

//   // For Decoding a password
//   const passwordHash = await bcrypt.hash(password, 10);
//   console.log(passwordHash);

//   // For Encoding a password
//   const passwordmatch = await bcrypt.compare(password, passwordHash);
//   console.log(passwordmatch);

// }
// securePassword('h');

// Basic syntax how to create token
// const jwt = require('jsonwebtoken');

// const createToken = async() => {
//   // create token                  id                             secretkey
//   const token = await jwt.sign({_id:'61be492b61d8c2f0113347a5'}, 'mynameishamzatahirchaudharygujjarhamzatahirchaudhary', {
//     expiresIn: "5 seconds"  //optional add expires date of token
//   })
//   console.log(token);

//   // verify token
//   const userVer = await jwt.verify(token, 'mynameishamzatahirchaudharygujjarhamzatahirchaudhary')
//   console.log(userVer);

// }
// createToken();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:port`)
})
