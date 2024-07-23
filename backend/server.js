const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const util = require('util');

// Promisify the exec function
const execPromise = util.promisify(exec);

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
app.post('/start-new-server', async (req, res) => {
  const { port, data } = req.body;
  // const port = '8080';

  console.log('####### creating configuration files ...')
  fs.writeFileSync(path.join(__dirname, 'user-app', 'src', 'components.json'), JSON.stringify(data.components))
  fs.writeFileSync(path.join(__dirname, 'user-app', 'src', 'properties.json'), JSON.stringify(data.properties))
  fs.writeFileSync(path.join(__dirname, 'user-app', 'src', 'variables.json'), JSON.stringify(data.variables))

  if (serverRunning) {
    console.log('####### stopping server ...')
    // res.status(400).json({ message: 'Server is already running' });
    // Stop the server
    serverInstance.close(() => {
      console.log('####### server stopped');
      serverRunning = false;
    });
  }

  const newApp = express();

  newApp.use(express.static(path.join(__dirname, 'user-app', 'dist')));

  /* Built the user App! (brainstorming here...)

  1. Create somewhere the basic React components (button, text, etc.)
  2. receive the components object
  2.1 Save object as json file that the Aoo.jsx reads öater
  3. Combine 1. and 2. to create a single React component for the app (like App.tsx)
  4. Build with vite the app
  5. return from this endpoint the build html file, which references the required js scripts

  */


  // CREATE THE BUILD WITH LATEST COMPONENTS AND PROPERTIES
  // Execute the npm run build command using child_process.exec
  console.log('####### building the React use-app =) ...')
  try {
    // Await the exec function to ensure it completes
    const { stdout, stderr } = await execPromise('npm run build:user-app');

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      // return res.status(500).send(`Build error: ${stderr}`);
    }

    console.log(`stdout: ${stdout}`);
    // res.send(`Build output: ${stdout}`);
  } catch (error) {
    console.error(`exec error: ${error}`);
    // res.status(500).send(`Error executing build: ${error.message}`);
  }

  console.log('####### user-app probably built correctly ...')


  // Serve some HTML content
  newApp.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'user-app', 'dist', 'index.html'));
    // res.send(`
    //     <html>
    //       <head><title>New Server</title></head>
    //       <body>
    //         <p>Data Received: ${JSON.stringify(data)}</p>
    //       </body>
    //     </html>
    //   `);
  });

  // Start the new server on the specified port
  // const server = newApp.listen(port, () => {
  serverInstance = newApp.listen(port, '0.0.0.0', () => {
    console.log(`New server (user-app) running on http://localhost:${port}`);
    serverRunning = true;
  });

  res.end()
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})