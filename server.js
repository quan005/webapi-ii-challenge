const express = require('express');
const helmet = require('helmet');

const router = require('./router.js');
const posts = require('./data/db.js')

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/posts', router);

server.get('/', (req, res) => {
    posts.find()
        .then(posts => {
            const messageOfTheDay = process.env.MOTD || "Catch 'em all";
            res.status(200).json({motd: messageOfTheDay, posts});
        })
        .catch (error => {
            console.error('\nERROR', error);
            res.status(500).json({ error: 'Cannot retrieve the posts' });
        });
});

server.post('/', (req, res) => {
    posts.add(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch (error => {
            console.error('\nERROR', error);
            res.status(500).json({ error: 'Cannot add the post' });
        });
});

module.exports = server;