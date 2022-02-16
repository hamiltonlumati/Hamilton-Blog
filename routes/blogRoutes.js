const express = require('express');
const blogController = require('../controllers/blogController');
const bodyParser = require('body-parser');
const router = express.Router();

router.get('/search', blogController.blog_search);
router.get('/create', blogController.blog_create_get);
router.get('/create/:id', blogController.blog_update_get);
router.get('/', blogController.blog_index);
router.post('/', blogController.blog_create_post);
router.post('/:id', blogController.blog_update_patch)
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete);



module.exports = router;