const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);

console.log('Server is starting');
server.listen(3000, () => {
    console.log(`Server running on port ${port}`);
});
