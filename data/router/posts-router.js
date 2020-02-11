const express = require('express');

const Posts = require('../db');

const router = express.Router();


// When the client makes a POST request to /api/posts
router.post('/', (req,res) => {
    
    if(!req.body.title || ! req.body.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
        Posts.insert(req.body).then(post => {
            res.status(201).json(post)
        }).catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database" });
        })
    }
})


//When the client makes a POST request to /api/posts/:id/comments
router.post(`/:id/comments`, (req,res) => {
    const msg = req.body.comment;
    const {id} = req.params;
    if(!msg){
        console.log('no body')
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    } else if(!Posts.findById(id)) {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
    } else {
        Posts.insertComment(req.body).then(comment => {
            res.status(201).json(comment)
        }).catch(err => {
            res.status(500).json({ error: "There was an error while saving the comment to the database" })
        })
    }
})


// When the client makes a GET request to /api/posts
router.get('/', (req,res) => {
    Posts.find().then(posts => {
        res.status(200).json(posts)
    }).catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

// When the client makes a GET request to /api/posts/:id
router.get(`/:id`, (req,res) => {
    const {id} = req.params;
    Posts.findById(id)
        .then(posts => {
            if(posts.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json(posts)
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

// When the client makes a GET request to /api/posts/:id/comments
router.get(`/:id/comments`, (req,res) => {
    const {id} = req.params;
    Posts.findById(id)
    .then(posts => {
        if(posts.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            Posts.findPostComments(id)
            .then(comments => {
                res.status(200).json(comments)
            })
            .catch(err => {
                res.status(500).json({ error: "The comments information could not be retrieved." })
            })
        }
    })
})

module.exports = router;