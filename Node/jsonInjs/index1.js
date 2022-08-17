const fs = require('fs');

const JsObject = {
    name: "Hamza", Fname: "Tahir", age: 20
}


const jsonObject = JSON.stringify(JsObject);
// const a = fs.writeFileSync('file.txt',jsonObject)
// const a = fs.readFileSync('file.txt','utf-8');
// const b = a.toString('utf-8');

// const a = fs.writeFile('json.json',jsonObject, (err)=>{
//     console.log("File Create Successfully!");
//     console.log(err);
// })

const a = fs.readFile('json.json','utf-8',(err,data)=>{
    console.log(data);
})


console.log(a);
// console.log(jsonObject);