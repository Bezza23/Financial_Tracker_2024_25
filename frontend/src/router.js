document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const token = localStorage.getItem('token');

  // Function to determine the user's role based on the token
  const getUserRole = () => {
      if (token) {
          const parts = token.split('.');
          if (parts.length !== 3) {
              console.error('Invalid JWT format');
              return null;
          }
          const payload = JSON.parse(atob(parts[1]));
          return payload.role; // Adjust this if the role claim has a different name
      }
      return null; // No token found
  };

  // Log the path and token for debugging
  console.log('Current path:', path);
  console.log('Token:', token);

  if (path === '/') {
      // Load the landing page (index.html)
      window.location.href = '/index.html';
  } else if (path === '/signup') {
      // If already logged in, redirect to the appropriate dashboard
      if (token) {
          const role = getUserRole();
          const redirectUrl = role === 'ADMIN' ? '/admin-dashboard.html' : '/user-dashboard.html';
          console.log('Redirecting to:', redirectUrl);
          window.location.href = redirectUrl;
      }
      // Else, allow the signup page to load
  } else if (path === '/user-dashboard.html' || path === '/admin-dashboard.html') {
      // Check if the user is authenticated
      if (!token) {
          // If not authenticated, redirect to signup or login page
          console.log('No token found, redirecting to signup.html');
          window.location.href = '/signup.html';
      }
  }
});