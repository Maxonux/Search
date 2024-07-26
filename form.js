var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/form.html', function(req, res)
{
	res.sendFile("form.html");
})

app.post('/process_post', urlencodedParser, function(req, res)
{
	var search = req.body.search;
	console.log(req.body.search);
	const{exec} = require('child_process');
	exec(`grep -rl ${search} data`, function(err, stdout, stderr) {
	console.log(stdout);
	let response = stdout.replace('\n','<br>')
	response = `Файлы в которых упоминается слово '${search}':<br><br>${response}`;
	res.send(response);
	})	
})

var server = app.listen(8080,function()
{
	var host = server.address().address
	var port =  server.address().port
	console.log("app listening http://%s:%s", host ,port);
})

