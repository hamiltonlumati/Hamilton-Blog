const Blog = require('../models/blog');
const bodyParser = require('body-parser');


const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { blogs: result, title: 'All blogs' });
        })
        .catch(err => {
            console.log(err);
        });
}

const blog_update_get = (req, res) => {
    const id = req.params.id;
    const op = 1;
    Blog.findById(id)
        .then(result => {
            res.render('create', { op: op, blog: result, title: 'Updating a blog', id: id });
        })
        .catch(err => {
            console.log(err);
            res.render('404', { title: 'Blog not found' });
        });
}

const blog_update_patch = (req, res) => {
    const id = req.params.id;
    const blog = new Blog(req.body);

    Blog.findByIdAndUpdate(id, { title: blog.title, snippet: blog.snippet, body: blog.body })
        .then(result => {
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
        });
}
const blog_details = (req, res) => {
    const id = req.params.id;
    const op = 0;
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: 'Blog Details' });
        })
        .catch(err => {
            console.log(err);
            res.render('404', { title: 'Blog not found' });
        });
}

const blog_create_get = (req, res) => {
    const op = 0;

    res.render('create', { op: op, title: 'Create a new blog' });
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => {
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
        });
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_update_get,
    blog_update_patch,
}