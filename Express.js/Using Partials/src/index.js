//Purpose of this file:
//       Make a partials file in hbs
// partials: can be used when we use same code(like navigation bar in each file home,about.contact etc) in different file

const express = require('express')
const path = require('path')  
const app = express()
const hbs = require('hbs')
const port = 8000

const staticPath = path.join(__dirname, '../public');
app.use(express.static(staticPath))  //for serving public folder file
 
// to set the view engine
app.set('view engine', 'hbs');    //there is no need to give the path of views directory the node do this work automatically but in static file it's compulsory to give the directory file name

const templatePath = path.join(__dirname, '../mytemplatefile/views');
app.set('views',templatePath);    //used to change "views" directroy file

const partialPath = path.join(__dirname, '../mytemplatefile/partials');
hbs.registerPartials(partialPath)

app.get('/hbs', (req, res) => {
  res.render('index', {
      channelName: 'ProgrammingWithHT'
  })      //if we write index.hbs then no need to write |app.set('view engine', 'hbs');| this line remember that
                      //render() use for send whole file
})

app.get('/', (req, res) => {     //        /=index.html  Remember!
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
  res.render('about',{title:'about'})   //whenever we use template than we use render method
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})