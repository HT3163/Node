//Purpose of this file:
//       Make a partials file in hbs
// partials: can be used when we use same code(like navigation bar in each file home,about.contact etc) in different file

const express = require('express')
const requests = require('requests')
const path = require('path')  
const app = express()
const hbs = require('hbs')
const port = process.env.PORT || 8000      //process.env.port used for when we server our website online than we give our own port not give node port e.g 3000,8000

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

  requests(
    `http://api.openweathermap.org/data/2.5/weather?q=faisalabad&units=metric&appid=d2b18a2382d27f783cbb15d493df59e3`
    // `http://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&units=metric&appid=d2b18a2382d27f783cbb15d493df59e3`
    )   //${req.query.name}  pass name in url Example: http://localhost:8000/about?name=faisalabad
    .on('data',(c)=> {
        const objdata = JSON.parse(c);
        const arrData = [objdata]
        console.log(`City Name: ${arrData[0].name} And Temperature: ${arrData[0].main.temp}`);
        // const realTimeData = arrData.map((val) => replaceVal(index,val)).join("");

            res.write(arrData[0].name);
        })
        .on('end',(err)=> {
            if (err) return console.log('connection closed due to errors', err);
            res.end();
            
    });

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})