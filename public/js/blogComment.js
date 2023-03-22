const commentFormHandler = async (event) => {
    event.preventDefault();
  
    // const commentTitle = document.querySelector('#comment-title').value.trim();
    const comment_content = document.querySelector('#comment-content').value.trim();
    const blog_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
  
    if (comment_content) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ blog_id, comment_content }),
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
  