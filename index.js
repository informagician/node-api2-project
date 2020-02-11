const express = require('express');
const cors = require('cors');

const postsRouter = require('./data/router/posts-router.js')

const server = express();

server.use(express.json());
server.use(cors());

server.use('/api/posts', postsRouter)

server.get('/', (req,res) => {
    res.send('<h1>Things are working!</h1>')
})

server.listen(5000, () => {
    console.log('\n*** Server Running on http://localhost:5000 ***\n')
})