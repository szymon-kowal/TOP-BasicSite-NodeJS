const http = require('http');
const fs = require('fs');
const path = require('path');
const helpers = require('./helpers/helpers.js');

const server = http.createServer((req, res) => {
	helpers.dynamicUrl(req.url, res);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));
