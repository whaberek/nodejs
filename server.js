const http = require('http');

const app = require('./app');

const port = process.env.PORT;
const server = http.createServer(app);

app.set('port', port);
server.listen(port);

module.exports = server;
