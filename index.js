const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

const hostname = 'monica-wang.com';
const httpPort = 80;
const httpsPort = 443;

const httpsOptions = {
	cert: fs.readFileSync(__dirname+'/ssl/2020.crt'),
	ca: fs.readFileSync(__dirname+'/ssl/2020.ca-bundle'),
	key: fs.readFileSync(__dirname+'/ssl/2020.key')
};

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'node',
	password: 'sjahdnkasqs34r321r4',
	database: 'personalhomepage'
});

const app = express();
const httpsServer = https.createServer(httpsOptions, app);
const httpServer = http.createServer(app,function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
});

var i=0;

class Member {
  constructor(name) {
    this.name = name;
  };
  setHeight(height) {
  	this.height = height;
  }
  setWeight(weight) {
  	this.weight = weight;
  }
  calcBMI() {
  	this.bmi = this.weight / (this.height*this.height);
  }
}

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/test', (req, res) => {
	/*res.set('Content-Type', 'text/html');

	let output ='';
	output += '<img src="/roubaozi/a.jpeg" style="border:3px solid red; margin:50px;">';
	output += '<a href="https://google.com/"><button type="button">Google</button></a>';
	output += '';
	output += '';*/

	let myArray = [];

	let tmp = new Member('Tim');
	tmp.setWeight(70);
	tmp.setHeight(186);
	tmp.calcBMI();
	myArray.push(tmp);

	tmp = new Member('Mengyi');
	tmp.setWeight(55);
	tmp.setHeight(173);
	tmp.calcBMI();
	myArray.push(tmp);

	tmp = new Member('Roubaozi');
	tmp.setWeight(3);
	myArray.push(tmp);

	/*let family = {
		"name": "HoppWang",
		"country": "USA",
		"members": [
			{
				"age":"27",
				"fullname":"Tim-Jannick Hopp"
			},
			{
				"age":"25",
				"fullname":"Mengyi Wang"
			},
			{
				"age":"3",
				"fullname":"Roubaozi Wang"
			},
		]
	};*/

	res.status(200).json(myArray);
});
app.get('/add', (req, res) => {
	res.set('Content-Type', 'text/html');
	res.status(200).send('value of i: ' + ++i);
});

app.get('/subtract', (req, res) => {
	res.set('Content-Type', 'text/html');
	res.status(200).send('value of i: ' + --i);
});

app.get('/comments', (req, res) => {
	connection.query('SELECT * FROM comments ORDER BY time DESC', (err,rows) => {
	 	if(err) throw err;
	  	console.log('Data received from Db:');
	  	console.log(rows);

		let comments=[];
		for(let i=0; i<rows.length;i++){
			comments.push({
				"name":rows[i].name,
				"content":rows[i].content,
				"time":rows[i].time
			});
		}
		console.log(comments);
		res.status(200).json(comments);
	});
});

app.post('/comments',[
	body('name').isLength({ min: 3 }).escape(),
	body('comment').isLength({ min: 3 }).escape()
],(req,res)=>{
	console.log(req.body);

	var err = validationResult(req);
	if (!err.isEmpty()) {
		console.log(err.mapped())
		return res.status(400).json({ errors: err.array() });
	} else {
		console.log(req.body);

		var date = new Date();
		var timestamp = parseInt(date.getTime() / 1000);

		console.log('INSERT INTO comments (name,time,content) VALUES("'+req.body.name+'",'+timestamp+',"'+req.body.comment+'")');

		connection.query('INSERT INTO comments (name,time,content) VALUES(?,?,?)', [req.body.name, timestamp, req.body.comment], (err,rows) => {
		 	if(err) {
		 		res.status(500).send();
		 	} else {
		 		res.status(200).send();
		 	}
		});
	}
});




connection.connect((err) => {
	if (err) throw err;
	console.log('Connected!');
	httpServer.listen(httpPort, () => console.log(`HTTP Server listening on port ${httpPort}!`));
	httpsServer.listen(httpsPort, () => console.log(`HTTPS Server listening on port ${httpsPort}!`));
});
