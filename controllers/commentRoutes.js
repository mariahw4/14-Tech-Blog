const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({ 
       ...req.body,
        user_id: req.session.user_id,
    
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;
















  
// router.get('/comments', withAuth, async (req, res) => {
//     try {
//       const commentData = await Blog.findOne({
//         where: {
//           id: req.params.id
//         },
//         attributes: ['id', 'title', 'content', 'date_created'],
  
//         include: [
//           {
//             model: Comment,
//             attributes: ['id', 'comment_content', 'blog_id', 'user_id'],
//             include: {
//               model: User,
//               attributes: ['username']
//               }
//           },
//           {
//             model: User,
//             attributes: ['username'],
//           },
//         ],
//       });
//       const comment = commentData.get({ plain: true });

//       res.render('comment', {
//         ...comment,
//         loggedIn: req.session.loggedIn
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });