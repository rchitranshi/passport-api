const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const port = parseInt(process.env.port, 10) || 1000;
const path = require('path');

//Set up express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./server/routes')(app);

app.get('*', (req, res) => {
	res.status(200).send({message: "welcome !!"});
});

app.listen(port);