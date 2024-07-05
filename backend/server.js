const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const bodyParser = require('body-parser');

// Middleware to parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<h1>TesT</h1>')
})

app.use(cors({
  // probably only needed during development
  origin: 'http://localhost:5173' // React app's URL
}));

// Spin up a server for the preview
let serverRunning = false;
let serverInstance = null;
app.post('/start-new-server', (req, res) => {
  const { port, data } = req.body;
  // const port = '8080';

  if (serverRunning) {
    // res.status(400).json({ message: 'Server is already running' });
    // Stop the server
    serverInstance.close(() => {
      console.log('Server stopped');
      serverRunning = false;
    });
  }

  const newApp = express();

  // Serve some HTML content
  newApp.get('/', (req, res) => {
    res.send(`
        <html>
          <head><title>New Server</title></head>
          <body>
            <p>Data Received: ${JSON.stringify(data)}</p>
          </body>
        </html>
      `);
  });

  // Start the new server on the specified port
  // const server = newApp.listen(port, () => {
  serverInstance = newApp.listen(port, '0.0.0.0', () => {
    console.log(`New server running on http://localhost:${port}`);
    serverRunning = true;
  });

  res.end()
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})