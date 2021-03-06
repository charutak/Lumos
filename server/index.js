var mqtt = require('mqtt')
var client  = mqtt.connect('http://139.59.11.198')

const express = require('express')
var app = express()
const port = 3000

app.use(express.urlencoded());
app.use(express.json());


app.get('/', function(req, res) {
    res.send('hello world')
})

app.post('/sendColor', function (req, res) {
    client.publish('red', String(req.body.red));
    client.publish('blue', String(req.body.green));
    client.publish('green', String(req.body.blue));
    console.log(req.body.red);
    console.log(req.body.blue);
    console.log(req.body.green);
    res.send({
        "message" : "Color Recieved"
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})