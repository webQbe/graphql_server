const express = require('express'); // Import Express framework

const app = express();              // Initialize an Express app

app.listen(4000, () => {            // Start the server on port 4000
    console.log('Server is running on port 4000...');
})