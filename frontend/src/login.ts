import { login } from './api'; // Import the login function from api.ts

// Select form elements
const emailInput = document.querySelector('#email') as HTMLInputElement;
const passwordInput = document.querySelector('#password') as HTMLInputElement;
const form = document.querySelector('form') as HTMLFormElement;
const errorMessage = document.querySelector('#errorMessage') as HTMLElement;

// Add a submit event listener to the form
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Trim values to avoid unnecessary spaces
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validate email and password fields
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
        emailInput.classList.add('is-invalid');
        displayError(emailInput, 'Please enter a valid email address.');
        isValid = false;
    } else {
        emailInput.classList.remove('is-invalid');
        clearError(emailInput);
    }

    if (!password || password.length < 8) {
        passwordInput.classList.add('is-invalid');
        displayError(passwordInput, 'Password must be at least 8 characters long.');
        isValid = false;
    } else {
        passwordInput.classList.remove('is-invalid');
        clearError(passwordInput);
    }

    // If valid, proceed with form submission logic
    if (isValid) {
        try {
            // Use the login function from api.ts
            const data = await login(email, password);

            if (data.access_token) {
                // Store JWT securely in localStorage
                localStorage.setItem('authToken', data.access_token);
                localStorage.setItem('userRole', data.role); // Store user role

                // Redirect based on the role
                if (data.role === 'admin') {
                    window.location.href = '/admin-dashboard.html';
                } else {
                    window.location.href = '/user-dashboard.html';
                }
            } else {
                throw new Error(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            displayGlobalError(error.message || 'An error occurred during login. Please try again.');
        }
    }
});

// Helper functions for displaying and clearing errors
function displayError(inputElement: HTMLInputElement, message: string) {
    const errorElement = inputElement.nextElementSibling as HTMLElement;
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearError(inputElement: HTMLInputElement) {
    const errorElement = inputElement.nextElementSibling as HTMLElement;
    if (errorElement){
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

function displayGlobalError(message: string) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}