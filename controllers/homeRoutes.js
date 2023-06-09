const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      attributes: ['id', 'title', 'content', 'date_created'],

      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_content', 'blog_id', 'user_id'],
          include: {
            model: User,
            attributes: ['username'],
            }
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      loggedIn: req.session.loggedIn 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/home', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      attributes: ['id', 'title', 'content', 'date_created'],
          
          include: [{
                  model: User,
                  attributes: [
                      'username',
                  ]
              },

              {
                  model: Comment,
                  attributes: ['id', 'comment_content', 'blog_id', 'user_id'],
                  include: {
                      model: User,
                      attributes: ['username']
                  }
              },
          ]
        })
    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
  
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      loggedIn: req.session.loggedIn 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', withAuth, async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'title', 'content', 'date_created'],

      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_content', 'date_created', 'blog_id', 'user_id'],
          include: {
            model: User,
            attributes: ['username']
            }
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('single_blog', {
      ...blog,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
