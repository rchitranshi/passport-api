const express = require('express');
const bodyParser = require('body-parser');
const port = parseInt(process.env.port, 10) || 1000;
const passport = require('passport');

const strategy = require('./server/config/passport');

passport.use(strategy);

var app = express();
app.use(passport.initialize());

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/json
app.use(bodyParser.json())

require('./server/routes')(app);

app.get('*', (req, res) => {
	res.status(200).send({message: "welcome !!"});
});

app.listen(port);