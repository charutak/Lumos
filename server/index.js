var mqtt = require('mqtt')
var client  = mqtt.connect('http://139.59.11.198/')

const express = require('express')
var app = express()
const port = 3000

app.get('/', function(req, res) {
    res.send('hello world')
})

app.post('/sendColor', function (req, res) {
    console.log(req)
    client.publish('color', 'Yellow')
    res.send('POST request to the send color')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})