const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req,res) => {
    res.send('<h1>Things are working!</h1>')
})

server.listen(5000, () => {
    console.log('\n*** Server Running on http://localhost:5000 ***\n')
})