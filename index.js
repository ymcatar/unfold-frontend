var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/main/*', (req, res, next) => {
	res.sendFile(path.resolve(__dirname, './dist/main/index.html'));
});

app.get('*', (req, res, next) => {
	res.sendFile(path.resolve(__dirname, './dist/landing/index.html'));
});

app.listen(3000, () => {
	console.log('Server running at port 3000.');
});

module.exports = app;
