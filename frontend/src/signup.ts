// Import the signup function from api.ts
import { signup } from "./api";

// Types for API responses and form data
interface SignupResponse {
  success: boolean;
  message: string;
  access_token?: string;
}

interface SignupData {
  email: string;
  password: string;
  role: string; // Add role to match the API
}

// Constants

// Element selectors with null checks
const getElement = <T extends HTMLElement>(selector: string): T | null =>
  document.querySelector<T>(selector);

const signupForm = getElement<HTMLFormElement>("form");
const emailInput = getElement<HTMLInputElement>("#email");
const passwordInput = getElement<HTMLInputElement>("#password");
const confirmPasswordInput = getElement<HTMLInputElement>("#confirm-password");
const roleInput = getElement<HTMLSelectElement>("#role"); // Add role input
const errorMessage = getElement<HTMLDivElement>("#errorMessage");

// Utility functions
const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidPassword = (password: string): boolean =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);

const displayFieldError = (input: HTMLInputElement, message: string): void => {
  input.classList.add("is-invalid");
  const feedbackElement = input.nextElementSibling as HTMLElement | null;
  feedbackElement && (feedbackElement.textContent = message);
};

const resetFieldErrors = (...inputs: HTMLInputElement[]): void => {
  inputs.forEach((input) => input.classList.remove("is-invalid"));
};

const displayErrorMessage = (message: string): void => {
  if (errorMessage) {
    errorMessage.textContent = message;
  }
};

const clearErrorMessage = (): void => {
  if (errorMessage) {
    errorMessage.textContent = "";
  }
};

const validateForm = (): { valid: boolean; errors: string[] } => {
  let valid = true;
  const errors: string[] = [];

  if (emailInput && !isValidEmail(emailInput.value.trim())) {
    displayFieldError(emailInput, "Please enter a valid email.");
    errors.push("Invalid email");
    valid = false;
  }

  if (passwordInput && !isValidPassword(passwordInput.value)) {
    displayFieldError(
      passwordInput,
      "Password must be at least 8 characters long and include uppercase, lowercase, and a number."
    );
    errors.push("Invalid password");
    valid = false;
  }

  if (
    passwordInput &&
    confirmPasswordInput &&
    passwordInput.value !== confirmPasswordInput.value
  ) {
    displayFieldError(confirmPasswordInput, "Passwords do not match.");
    errors.push("Passwords do not match");
    valid = false;
  }

  return { valid, errors };
};

// Main event handler
const handleFormSubmit = (event: SubmitEvent): void => {
  event.preventDefault();
  clearErrorMessage();

  if (!emailInput || !passwordInput || !confirmPasswordInput || !roleInput) {
    displayErrorMessage("Required input elements are missing.");
    return;
  }

  resetFieldErrors(emailInput, passwordInput, confirmPasswordInput);

  const { valid } = validateForm();
  if (valid) {
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const role = roleInput.value.toUpperCase(); // Get role from the form

    // Use the signup function from api.ts
    signup(email, password, role)
      .then((response: SignupResponse) => {
        if (response.access_token) {
          localStorage.setItem("token", response.access_token);
          const redirectUrl =
            role === "ADMIN"
              ? "./admin-dashboard.html"
              : "./user-dashboard.html";
          window.location.href = redirectUrl;
        } else {
          displayErrorMessage(
            response.message || "Signup failed. Please try again."
          );
        }
      })
      .catch((error) => {
        console.error("Signup error:", error);
        displayErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
      });
  }
};

// Attach event listener
signupForm?.addEventListener("submit", handleFormSubmit);
