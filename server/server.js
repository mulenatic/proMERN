const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/hello', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, function () {
  console.log('App started on port 3000');
});
