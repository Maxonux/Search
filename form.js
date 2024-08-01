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
	exec(`grep -rc ${search} data | sort -n -k2 -t':' -r`, function(err, stdout, stderr) {
	console.log(stdout);
	let response = fs.readFileSync("form.html").toString();
	//let out = stdout.replace('\n','<br>')
	let out = stdout.toString().split('\n');
	let output
	for (var line of out) {
    		//console.log(line);
		[file, n] = line.split(':');
		console.log(file, n);
		if ((n > 0) && (file)) {	
		output = output + file + `(встречается ${n} раз(а))<br>`
		}
	}
	console.log(out);
	response = response + `<br>Результат по запросу: '${search}':<br>${output}`;
	res.send(response);
	})	
})

var server = app.listen(8080,function()
{
	var host = server.address().address
	var port =  server.address().port
	console.log("app listening http://%s:%s", host ,port);
})

