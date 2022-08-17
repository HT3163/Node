
const fs = require('fs')
const http = require('http')

const server = http.createServer();

server.on('request',(req,res)=>{

    // Old 1st Method For Stream

    // fs.readFile('input.txt','utf-8',(err,data)=>{
    //     if(err) return console.error(err);
    //     console.log(data);
    //     res.end(data);
    // })


    // New 2nd Method For Stream

    // const rstream = fs.createReadStream('input.txt');
    // rstream.on('data',(chunkdata)=>{
    //     res.write(chunkdata);
    // });
    // rstream.on('end',()=>{
    //     res.end();
    // });
    // rstream.on('error',(err)=>{
    //     console.log(err);
    //     res.end("File NOt Found")
    // });


    // Use Pip for stream 3rd Method
    const rstream = fs.createReadStream('input.txt');
    rstream.pipe(res);

})

server.listen(80,'127.0.0.1');