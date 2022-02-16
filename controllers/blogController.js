const Blog = require('../models/blog');
const bodyParser = require('body-parser');

//index controll: render the page where all the blogs will be showed
const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { blogs: result, title: 'All blogs' });
        })
        .catch(err => {
            console.log(err);
        });
}

//receives the data to update a blog that already exists in the database and validates it
const blog_update_get = (req, res) => {
    const id = req.params.id;
    const op = 1;
    const val = 0;
    Blog.findById(id)
        .then(result => {
            res.render('create', { val: val, op: op, blog: result, title: 'Updating a blog', id: id });
        })
        .catch(err => {
            console.log(err);
            res.render('404', { title: 'Blog not found' });
        });
}


//if the data is accepted the blog with the indicated id will have its data updated
const blog_update_patch = (req, res) => {
    const id = req.params.id;
    const blog = new Blog(req.body);
    if ((blog.title.length < 4) || (blog.snippet.length < 4) || (blog.body.length < 4)) {
        Blog.findById(id)
            .then(result => {
                res.render('create', { id: id, val: 1, op: 1, blog: result, title: 'Update Details' });
            })
            .catch(err => {
                console.log(err);
                res.render('404', { title: 'Blog not found' });
            });
    } else {
        Blog.findByIdAndUpdate(id, { title: blog.title, snippet: blog.snippet, body: blog.body })
            .then(result => {
                res.redirect('/blogs');
            })
            .catch(err => {
                console.log(err);
            });
    }
}

//controller that prepares the details page and renders it
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

//controller that receives the data of a blog that is about to be created
const blog_create_get = (req, res) => {

    res.render('create', { val: 0, op: 0, title: 'Create a new blog' });
}

//controller to store the introduced data into the database after the data is validated
const blog_create_post = (req, res) => {
    const id = req.params.id;
    const blog = new Blog(req.body);
    if ((blog.title.length < 4) || (blog.snippet.length < 4) || (blog.body.length < 4)) {
        Blog.findById(id)
            .then(result => {
                res.render('create', { id: id, op: 1, val: 1, blog: result, title: 'Blog Details' });
            })
            .catch(err => {
                console.log(err);
                res.render('404', { title: 'Blog not found' });
            });
    } else {

        blog.save()
            .then(result => {
                res.redirect('/blogs');
            })
            .catch(err => {
                console.log(err);
            });
    }
}

//controller to delete a blog
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

//search controller
const blog_search = (req, res) => {
    const blog = new Blog(req.body);
    Blog.find({ title: blog.search }).sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { blogs: result, title: `Showing results for${search}` });
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
    blog_search,
}