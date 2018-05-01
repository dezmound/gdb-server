let ngdbmi = require("ngdbmi");
const express = require('express');
const app = new express();
const gdb = new ngdbmi();

app.put('/process/:pid/runtime-info', (req, res, next) => {
    gdb.command('attach', () => {
        gdb.sendcommand('-data-disassemble -s $pc -e "$pc + ' + (req.query.bytes || '20') + '" -- 2', function (e) {
            gdb.command('detach', () => {
                res.json(e).end();
            }, {target:req.params.pid});
        }, (e) => {
            // res.json(e);
        });
    }, {target:req.params.pid});
});
app.listen(3000);