
// const { ok } = require('assert');
// const d = require('events')

// const event = new d.EventEmitter();

// event.on('sayName',()=>{
//     console.log('Your Name Is Hamza')
// })
// event.on('sayName',()=>{
//     console.log('Your Name Is Qasim')
// })
// event.on('sayName',()=>{
//     console.log('Your Name Is Amna')
// })
// event.emit('sayName',200,'ok')  /*always call emit below the on event*/




const { ok } = require('assert');
const d = require('events')
const event = new d.EventEmitter();

event.on('checkPage',(sc,msg)=>{         /*sc= status code, msg= message*/
    console.log('Your Name Is Amna',`status code ${sc} and message is ${msg}`)
})
event.emit('checkPage',200,'ok')  /*always call emit below the on event*/