const newFormHandler = async (event) => {
    event.preventDefault();
  
    const commentTitle = document.querySelector('#comment-title').value.trim();
    const commentContent = document.querySelector('#comment-content').value.trim();
  
    if (commentTitle && commentContent) {
      const response = await fetch(`/api/blogs`, {
        method: 'POST',
        body: JSON.stringify({ commentTitle, commentContent }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/blog/:id');
      } else {
        alert('Failed to create comment');
      }
    }
  };
  
  
  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);
  
  