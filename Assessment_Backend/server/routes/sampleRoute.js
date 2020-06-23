// Requires
const express = require('express');
const router = express.Router();
// Controllers
const sampleController = require('../controllers').sampleController;

// router.get('/', sampleController.sampleEndpoint);
router.get('/posts', sampleController.getAllPosts);
router.post('/posts', sampleController.postNewPost);
router.delete('/posts/:id', sampleController.deletePost);
router.put('/posts', sampleController.updatePost);

module.exports = router;