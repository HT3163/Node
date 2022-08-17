// const fs = require('fs')
// const http = require('http');
// const hostname = '127.0.0.1';
// const port = 80;

// const server = http.createServer((req,res)=>{

    
//     console.log(req.url);
//     if (req.url == '/'){
//         res.end("This is a home page of programmingwithht");
//     }else if (req.url == '/about'){
//         res.write("This is a about page of programmingwithht")
//         res.end();
//     }else if (req.url == '/api'){
//         fs.readFile(`${__dirname}/api/api.JSON`,'utf-8', (err, data) => {           /*also work     fs.readFile('./api/api.JSON','utf-8', (err, data) => {
//                                                                               this line not work remember different of .          fs.readFile('/api/api.JSON','utf-8', (err, data) => {*/
//             if (err) throw err;
//             console.log(data.firstName);
//           });
//         res.end("HI Working Property");
//     }else {
//         // res.writeHead(404);  //to get error at console of browser
//         res.writeHead(404,{"Content-type" : "text/html"});  //give browse that our file is html file but if don't write than our by default name is document
//         res.end ("<h1>404: Error ! Page not found</h1>");
//     }

// })

// server.listen(port,hostname,()=>{
//     console.log(`Server running at http://${hostname}:${port}/`);
// })






const fs = require('fs')
const http = require('http');
const hostname = '127.0.0.1';
const port = 80;

const server = http.createServer((req,res)=>{
    const data = fs.readFileSync(`${__dirname}/api/api.JSON`,'utf-8')
    const dataObj = JSON.parse(data);
    console.log(req.url);
    if (req.url == '/'){
        res.end("This is a home page of programmingwithht");
    }else if (req.url == '/about'){
        res.write("This is a about page of programmingwithht")
        res.end();
    }else if (req.url == '/api'){
        console.log(dataObj[0].firstName);
        res.end(data);
    }else {
        // res.writeHead(404);  //to get error at console of browser
        res.writeHead(404,{"Content-type" : "text/html"});  //give browse that our file is html file but if don't write than our by default name is document
        res.end ("<h1>404: Error ! Page not found</h1>");
    }

})

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
})