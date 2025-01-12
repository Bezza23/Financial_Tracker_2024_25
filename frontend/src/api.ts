const BASE_URL = 'http://localhost:3333'; // Replace with your backend URL

// Utility function to handle Fetch API requests
const fetchApi = async (endpoint: string, method: string, data?: any, token?: string) => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
        redirect: 'follow', // Automatically follow redirects
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
};

// ======================
// Authentication API
// ======================

/**
 * Sign up a new user.
 * @param email - User's email.
 * @param password - User's password.
 * @param role - User's role (e.g., 'user', 'admin').
 */
export const signup = async (email: string, password: string, role: string) => {
    return fetchApi('/auth/signup', 'POST', { email, password, role });
};

/**
 * Log in an existing user.
 * @param email - User's email.
 * @param password - User's password.
 */
export const login = async (email: string, password: string) => {
    return fetchApi('/auth/signin', 'POST', { email, password });
};

// ======================
// User CRUD API
// ======================

export const getAllUsers = async (token: string) => {
    return fetchApi('/users', 'GET', undefined, token);
};

export const getUserById = async (id: string, token: string) => {
    return fetchApi(`/users/${id}`, 'GET', undefined, token);
};

export const updateUser = async (id: string, data: { email?: string; password?: string; role?: string }, token: string) => {
    return fetchApi(`/users/${id}`, 'PUT', data, token);
};

export const deleteUser = async (id: string, token: string) => {
    return fetchApi(`/users/${id}`, 'DELETE', undefined, token);
};

// ======================
// Income and Expense API
// ======================

/**
 * Add income for a user.
 * @param userId - User's ID.
 * @param amount - Income amount.
 * @param source - Income source.
 * @param description - Income description.
 * @param token - Authentication token.
 */
export const addIncome = async (userId: string, amount: number, source: string, description: string, token: string) => {
    return fetchApi('/income', 'POST', { userId, amount, source, description }, token);
};

/**
 * Add expense for a user.
 * @param userId - User's ID.
 * @param amount - Expense amount.
 * @param type - Expense type.
 * @param description - Expense description.
 * @param token - Authentication token.
 */
export const addExpense = async (userId: string, amount: number, type: string, description: string, token: string) => {
    return fetchApi('/expense', 'POST', { userId, amount, type, description }, token);
};

/**
 * Fetch all incomes for a user.
 * @param userId - User's ID.
 * @param token - Authentication token.
 */
export const getIncomes = async (userId: string, token: string) => {
    return fetchApi(`/income/${userId}`, 'GET', undefined, token);
};

/**
 * Fetch all expenses for a user.
 * @param userId - User's ID.
 * @param token - Authentication token.
 */
export const getExpenses = async (userId: string, token: string) => {
    return fetchApi(`/expense/${userId}`, 'GET', undefined, token);
};