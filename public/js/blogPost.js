const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-title').value.trim();
  const content = document.querySelector('#blog-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create blog');
    }
  }
};


const updateButtonHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id-one')) {
    const id = event.target.getAttribute('data-id-one');

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        blog_id: id,
        // title,
        // content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update blog');
    }
  }
};


const delButtonHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog');
    }
  }
};


document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);

  // would need a 3rd document and listeners to run the PUT 
document
.querySelector('.blog-update')
.addEventListener('click', updateButtonHandler); 

document
  .querySelector('.delete-blog')
  .addEventListener('click', delButtonHandler);
