const express = require('express')
const path = require('path')  
const app = express()
const port = 8000


// in node there are two type of path 
// 1) relative     e.g ../home/
// 2) absolute     e.g __dirname
// console.log(__dirname);                                         //OUTPUT: C:\Users\Tahir\Desktop\node\Express.js\Serve HTML CSS & JS Files\src
// console.log(path.join(__dirname,'..'))                          //OUTPUT: C:\Users\Tahir\Desktop\node\Express.js\Serve HTML CSS & JS Files
// console.log(path.join(__dirname,'../public/css/style.css'))     //OUTPUT: C:\Users\Tahir\Desktop\node\Express.js\Serve HTML CSS & JS Files\public\css\style.css

// make variable to store path
const staticPath = path.join(__dirname, '../public');

// built-in middleware for serving static file
app.use(express.static(staticPath))

app.get('/', (req, res) => {       //      '/' == index.html
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})