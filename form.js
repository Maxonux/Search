var express = require('express');
var fs = require("fs");
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/form.html', function(req, res)
{
	res.sendFile( __dirname + '/' + "form.html");
})
app.get('/style.css', function(req, res)
{
	res.sendFile( __dirname + '/' + "style.css");
})

app.post('/process_post', urlencodedParser, function(req, res)
{
	var search = req.body.search;
	console.log(req.body.search);
	const{exec} = require('child_process');
	exec(`grep -rl ${search} data`, function(err, stdout, stderr) {
	console.log(stdout);
	let response = fs.readFileSync("form.html").toString();
	let out = stdout.replace('\n','<br>')
	response = response + `<br>Результат по запросу: '${search}':<br>${out}`;
	res.send(response);
	})	
})

var server = app.listen(8080,function()
{
	var host = server.address().address
	var port =  server.address().port
	console.log("app listening http://%s:%s", host ,port);
})

