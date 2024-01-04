//  url = req.url < - input
const path = require('path');
const fs = require('fs');

function dynamicUrl(url, res) {
	let filePath = path.join(
		process.cwd(),
		'pages',
		url === '/' ? 'index.html' : url
	);

	console.log('Serving:', filePath); // Debugging line

	let extName = path.extname(filePath);

	if (!extName) {
		filePath += '.html';
	}

	console.log('file path: ', filePath);
	let contentType = 'text/html';

	switch (extName) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.json':
			contentType = 'application/json';
			break;
		case '.png':
			contentType = 'image/png';
			break;
		case '.jpg':
			contentType = 'image/jpg';
			break;
	}

	// Read File
	fs.readFile(filePath, (err, data) => {
		if (err) {
			if (err.code === 'ENOENT') {
				// Page not found
				fs.readFile(
					path.join(process.cwd(), 'pages', 'error.html'),
					(err, data) => {
						res.writeHead(200, { 'Content-type': 'text-html' });
						res.end(data, 'utf-8');
					}
				);
			} else {
				// some server error - 5xx
				res.writeHead(500);
				res.end(`Server Error: ${err.code}`);
			}
		} else {
			res.writeHead(200, { 'Content-type': contentType });
			res.end(data, 'utf-8');
		}
	});
}

module.exports = { dynamicUrl };
