var express = require('express');
var path = require('path');
var app = express();

var routes = require('./routes/index.js');

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
	res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

app.use('/', routes);

app.listen(3000, () => {
	console.log('Server running at port 3000.');	
});

module.exports = app;
