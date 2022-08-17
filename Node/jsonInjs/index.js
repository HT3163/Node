const bioData = {
    name: "Hamza",
    Fname: "Tahir",
    Roll_NUm: 4301
};

const jsonData = JSON.stringify(bioData)   //stringigy when we use if we want to convert js oject into json object

console.log(jsonData);
console.log(jsonData.name);  //not work this syntax in json object 
console.log(bioData.name);  //work

const objData = JSON.parse(jsonData)  //convert json object to js object
console.log(objData);
