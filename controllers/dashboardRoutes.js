const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


// router.get('/', async (req, res) => {
//     try {
//       // Get all blogs and JOIN with user data
//       const blogData = await Blog.findAll({
//         where: {
//             user_id: req.session.user_id
//         },
//         attributes: ['id', 'title', 'content', 'date_created'],
  
//         include: [
//           {
//             model: Comment,
//             attributes: ['id', 'comment_content', 'blog_id', 'user_id'],
//             include: {
//               model: User,
//               attributes: ['username'],
//               }
//           },
//           {
//             model: User,
//             attributes: ['username'],
//           },
//         ],
//       });
  
      
//       // Serialize data so the template can read it
//     //   const blogs = blogData.map((blog) => blog.get({ plain: true }));
//       const user = userData.get({ plain: true });

  
//       // Pass serialized data and session flag into template
//       res.render('dashboard', { 
//         // blogs, 
//         user,
//         loggedIn: req.session.loggedIn 
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

  router.get('/', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Blog }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('dashboard', {
        ...user,
        loggedIn: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });



// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Blog }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('dashboard', {
        ...user,
        loggedIn: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;