const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors')

const app = express();
const PORT = 7070
app.use(cors())
app.use('/api', createProxyMiddleware({ target: 'http://server:8080', changeOrigin: true }));
app.listen(PORT);
console.log(`✓ 😜 Proxy server started successfully on port:${PORT} pid:${process.pid}`)
// http://localhost:3000/api/foo/bar -> http://server:8080/api/foo/bar