const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment_content = document.querySelector('#comment-content').value.trim();
    const blog_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    // const user_id = req.session.user_id;
    // const date_created = req.session.date_created;
  
    if (comment_content) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment_content, blog_id, }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create comment');
      }
    }
  };

  const commentDelButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete comment');
      }
    }
  };
  
  
  document
    .querySelector('.new-comment-btn')
    .addEventListener('submit', commentFormHandler);
  
  document
    .querySelector('.comment-delete')
    .addEventListener('click', commentDelButtonHandler);
  