const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const mysql = require('mysql');

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
const httpServer = http.createServer(app);

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
connection.query('SELECT * FROM comments', (err,rows) => {
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

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
httpServer.listen(httpPort, () => console.log(`HTTP Server listening on port ${httpPort}!`));
httpsServer.listen(httpsPort, () => console.log(`HTTPS Server listening on port ${httpsPort}!`));
});
