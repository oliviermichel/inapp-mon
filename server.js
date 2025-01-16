/* eslint-disable @typescript-eslint/no-require-imports */
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data/all.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use((req, res, next) => {
    console.log("Request received in server.js");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.use(router);

server.use(jsonServer.rewriter({"/sitecoredata": "/sitecore/data"}));

server.listen(3001, () => {
    console.log('JSON Server is running');
});