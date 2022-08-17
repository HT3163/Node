// api.openweathermap.org/data/2.5/weather?q=faisalabad&appid=d2b18a2382d27f783cbb15d493df59e3

const http = require('http');
const fs = require('fs');
var requests = require('requests');
const hostname = '127.0.0.1';
const port = 8000;

const index = fs.readFileSync("index.html", "utf-8");

// User define function
const replaceVal = (tempVal, orgVal)=> {
    let temperature = tempVal.replace("{%tempval%}",orgVal.main.temp)
    temperature = temperature.replace("{%tempmin%}",orgVal.main.temp_min)
    temperature = temperature.replace("{%tempmix%}",orgVal.main.temp_max)
    temperature = temperature.replace("{%location%}",orgVal.name)
    temperature = temperature.replace("{%country%}",orgVal.sys.country)
    temperature = temperature.replace("{%tempstatus%}",orgVal.weather[0].main)
    return temperature
}


const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests(
            'http://api.openweathermap.org/data/2.5/weather?q=faisalabad&appid=d2b18a2382d27f783cbb15d493df59e3'
            )
            .on('data',(c)=> {
                const objdata = JSON.parse(c);
                const arrData = [objdata]
                
                const realTimeData = arrData.map((val) => replaceVal(index,val)).join("");

                    res.write(realTimeData);
                })
                .on('end',(err)=> {
                    if (err) return console.log('connection closed due to errors', err);
                    res.end();
                    
            });
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

