const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
  const commentData = await Comment.findAll({  })

res.status(200).json(commentData);
  } catch(err) {
    res.status(400).json(err);
  }
});

module.exports = router;























// router.get('/:id', async (req, res) => {
//   try {
//   const commentData = await Comment.findAll({ 
//     where: {
//       id: req.params.id
//     }
//    })

// res.status(200).json(commentData);
//   } catch(err) {
//     res.status(400).json(err);
//   }
// });

// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newComment = await Comment.create({
//      ...req.body,
//       user_id: req.session.user_id,
  
//     });

//     res.status(200).json(newComment);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.delete('/:id', async (req, res) => {
//   try {
//   const commentData = await Comment.destroy({ 
//     where: {
//       id: req.params.id
//     }
//    })
//    if (!commentData) {
//     res.status(404).json({ message: 'No comment found with this id!' });
//     return;
//   }
//   res.status(200).json(commentData);
// } catch (err) {
//   res.status(500).json(err);
// }
// });


