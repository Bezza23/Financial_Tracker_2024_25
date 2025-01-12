var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// Constants
var API_URL = 'http://localhost:3333/auth/signin'; // Replace with your login API endpoint
var REDIRECT_URL = '/user-dashboard.html'; // Replace with your desired redirect URL
// Select elements
var form = document.querySelector('form');
var emailInput = document.querySelector('#email');
var passwordInput = document.querySelector('#password');
var errorMessage = document.querySelector('#errorMessage');
// Utility functions
var isValidEmail = function (email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
var displayFieldError = function (input, message) {
    input.classList.add('is-invalid');
    var feedbackElement = input.nextElementSibling;
    if (feedbackElement) {
        feedbackElement.textContent = message;
    }
};
var clearErrors = function () {
    [emailInput, passwordInput].forEach(function (input) {
        if (input) {
            input.classList.remove('is-invalid');
        }
    });
    if (errorMessage) {
        errorMessage.classList.add('d-none');
    }
};
// Check if user is already logged in
var token = localStorage.getItem('authToken');
if (token) {
    window.location.href = REDIRECT_URL;
}
// Main form handling
if (form && emailInput && passwordInput && errorMessage) {
    form.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
        var email, password, isValid, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    clearErrors();
                    email = emailInput.value.trim();
                    password = passwordInput.value.trim();
                    isValid = true;
                    // Validation
                    if (!email || !isValidEmail(email)) {
                        displayFieldError(emailInput, 'Please enter a valid email address');
                        isValid = false;
                    }
                    if (!password || password.length < 8) {
                        displayFieldError(passwordInput, 'Password must be at least 8 characters long');
                        isValid = false;
                    }
                    if (!isValid) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(API_URL, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ email: email, password: password })
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (data.token) {
                        // Store token and redirect
                        localStorage.setItem('authToken', data.token);
                        localStorage.setItem('userRole', data.role); // Store user role
                        window.location.href = REDIRECT_URL;
                    }
                    else {
                        // Show API error message
                        errorMessage.textContent = data.message || 'Login failed. Please try again.';
                        errorMessage.classList.remove('d-none');
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error('Login error:', error_1);
                    errorMessage.textContent = 'An error occurred. Please try again later.';
                    errorMessage.classList.remove('d-none');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
}