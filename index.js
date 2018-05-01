require("babel-core").transform("code", {
    plugins: ["transform-runtime"]
});
const {GDB} = require('gdb-js');
const {spawn} = require('cross-spawn');

let child = spawn('gdb', ['-i=mi']);
let gdb = new GDB(child);
gdb.init().then(() => {
    let promise =  gdb.attach(6532);
    promise.then(function (t) {
        let promise = gdb.execMI('-data-list-changed-registers');
        promise.then(function (s) {
            console.log(s);
        }).catch(function (e) {
            console.log(e);
        })
    });
});



