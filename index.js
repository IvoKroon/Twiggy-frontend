/**
 * Created by ivokroon on 17/11/2016.
 */
var express = require("express");
var app = express();

app.use(express.static(__dirname + '/bin/'));

var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/bin/index.html');
});

app.listen(port, function () {
    console.log("Running on PORT " + port);
});
