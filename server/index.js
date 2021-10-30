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
    client.publish('blue', String(req.body.blue));
    client.publish('green', String(req.body.green));
    console.log("Red = " , req.body.red);
    console.log("Green = ", req.body.green);
    console.log("Blue = ", req.body.blue);
    res.send({
        "message" : "Color Recieved"
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})