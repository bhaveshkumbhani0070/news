var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var api = require(__dirname + "/api/newsApi.js");


app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({
    limit: '500mb',
    extended: true,
    parameterLimit: 50000
}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,token');
    //res.setHeader('*');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use("/js", express.static(__dirname + '/view/js'));
app.use("/boot", express.static(__dirname + '/view/bootstrap'));
app.use('/npm', express.static(__dirname + '/node_modules'));
app.use('/view', express.static(__dirname + '/view'));

app.get('/', function(req, res) {
    res.sendFile('index.html', { 'root': "view" });
});
// app.post('/api/add/addcalllog', customer.addcalllog); //insert new record //
app.get('/api/news', api.agency);
app.get('/api/latestNews', api.latestNews);

// create server port //
app.listen(app.get('port'));
console.log("Started on Port No. ", app.get('port'));