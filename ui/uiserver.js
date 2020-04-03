require('dotenv').config();
const express = require('express');
const proxy = require('http-proxy-middleware');


    const port = process.env.UI_SERVER_PORT || 4000;

const app = express();

app.use(express.static('public'));

const apiProxyTarget = process.env.API_PROXY_TARGET;
if (apiProxyTarget) {
    console.log(`use proxy on ${apiProxyTarget}`);
    app.use('/graphql', proxy({ target: apiProxyTarget }));
}

const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT || 'http://localhost:3000/graphql';
const env = { UI_API_ENDPOINT };
console.log(`UI_API_ENDPOINT = ${UI_API_ENDPOINT}`);

app.get('/env.js', (req, res) => res.send(`window.ENV = ${JSON.stringify(env)}`));

app.listen(port, function() {
    console.log(`UI stated on port ${port}`);
});
