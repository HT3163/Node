
const add = (a,b)=>{
    return a+b;
}
const sub = (a,b)=>{
    return a-b;
}
const name = "HamzaTahir";
// module.exports = name;
// module.exports = add;

// how to pass multiple function
module.exports.add = add;
module.exports.sub1 = sub;

// pass multiple function with shortcut
// module.exports = { add, sub, name};