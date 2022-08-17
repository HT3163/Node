const express = require('express')
const path = require('path')  
const app = express()
const port = 8000
const staticPath = path.join(__dirname, '../public');

// to set the view engine
app.set('view engine', 'hbs');

// app.use(express.static(staticPath))  //for serving public folder file

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
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})