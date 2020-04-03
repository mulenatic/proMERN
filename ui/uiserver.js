const express = require('express');
require('dotenv').config();

const port = process.env.UI_SERVER_PORT || 4000;

const app = express();

app.use(express.static('public'));

app.listen(port, function() {
    console.log(`UI stated on port ${port}`);
});
