const express = require('express');

const app = express();

app.use(express.static('public'));

app.listen(4000, function() {
    console.log('UI stated on port 4000');
});
