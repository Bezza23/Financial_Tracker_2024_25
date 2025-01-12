import { getUserById, addIncome, addExpense, getIncomes, getExpenses } from './api';

// Type definitions
interface UserProfile {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

interface Income {
    id: string;
    amount: number;
    source: string;
    description: string;
}

interface Expense {
    id: string;
    amount: number;
    type: string;
    description: string;
}

// Variables for Income and Expense Management
let incomes: Income[] = [];
let expenses: Expense[] = [];
let nextIncomeId = 1;
let nextExpenseId = 1;

// Select elements
const userProfileContainer = document.querySelector<HTMLElement>('#userProfile')!;
const incomeForm = document.querySelector<HTMLFormElement>('#incomeForm')!;
const expenseForm = document.querySelector<HTMLFormElement>('#expenseForm')!;
const incomeList = document.querySelector<HTMLUListElement>('#incomeList')!;
const expenseList = document.querySelector<HTMLUListElement>('#expenseList')!;
const incomeSources = document.querySelector<HTMLTableSectionElement>('#incomeSources')!;
const expenseReasons = document.querySelector<HTMLTableSectionElement>('#expenseReasons')!;
const totalIncomeElement = document.querySelector<HTMLElement>('#totalIncome')!;
const totalExpensesElement = document.querySelector<HTMLElement>('#totalExpenses')!;

// Fetch user profile
async function fetchUserProfile(): Promise<void> {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const userId = 'current-user-id'; // Replace with actual user ID
        const response = await getUserById(userId, token);

        if (response.success && response.data) {
            renderUserProfile(response.data);
        } else {
            showError('Error fetching user profile: ' + (response.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        showError('Error loading user profile. Please try again later.');
    }
}

// Render user profile
function renderUserProfile(profile: UserProfile): void {
    userProfileContainer.innerHTML = `
        <h2>User Profile</h2>
        <p><strong>Email:</strong> ${profile.email}</p>
        <p><strong>First Name:</strong> ${profile.firstName || 'N/A'}</p>
        <p><strong>Last Name:</strong> ${profile.lastName || 'N/A'}</p>
        <p><strong>Role:</strong> ${profile.role}</p>
        <p><strong>Account Created:</strong> ${new Date(profile.createdAt).toLocaleDateString()}</p>
    `;
}

// Add Income
incomeForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const amount = Number((document.getElementById('incomeAmount') as HTMLInputElement).value);
    const source = (document.getElementById('incomeSourceInput') as HTMLInputElement).value;
    const description = (document.getElementById('incomeDescription') as HTMLInputElement).value;

    try {
        const userId = 'current-user-id'; // Replace with actual user ID
        const response = await addIncome(userId, amount, source, description, token);

        if (response.success) {
            incomes.push({ id: nextIncomeId++.toString(), amount, source, description });
            renderIncomes();
            updateSummary();
            incomeForm.reset();
        } else {
            throw new Error(response.error || 'Failed to add income');
        }
    } catch (error) {
        console.error('Error adding income:', error);
        showError('Failed to add income. Please try again.');
    }
});

// Add Expense
expenseForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const amount = Number((document.getElementById('expenseAmount') as HTMLInputElement).value);
    const type = (document.getElementById('expenseType') as HTMLInputElement).value;
    const description = (document.getElementById('expenseDescriptionInput') as HTMLInputElement).value;

    try {
        const userId = 'current-user-id'; // Replace with actual user ID
        const response = await addExpense(userId, amount, type, description, token);

        if (response.success) {
            expenses.push({ id: nextExpenseId++.toString(), amount, type, description });
            renderExpenses();
            updateSummary();
            expenseForm.reset();
        } else {
            throw new Error(response.error || 'Failed to add expense');
        }
    } catch (error) {
        console.error('Error adding expense:', error);
        showError('Failed to add expense. Please try again.');
    }
});

// Render Incomes
function renderIncomes(): void {
    incomeList.innerHTML = '';
    incomes.forEach(income => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerText = `${income.source}: $${income.amount} - ${income.description}`;
        incomeList.appendChild(li);
    });
}

// Render Expenses
function renderExpenses(): void {
    expenseList.innerHTML = '';
    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerText = `${expense.type}: $${expense.amount} - ${expense.description}`;
        expenseList.appendChild(li);
    });
}

// Update Summary
function updateSummary(): void {
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    totalIncomeElement.innerText = totalIncome.toString();
    totalExpensesElement.innerText = totalExpenses.toString();

    incomeSources.innerHTML = '';
    incomes.forEach(income => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${income.source}</td><td>$${income.amount}</td>`;
        incomeSources.appendChild(tr);
    });

    expenseReasons.innerHTML = '';
    expenses.forEach(expense => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${expense.type}</td><td>$${expense.amount}</td>`;
        expenseReasons.appendChild(tr);
    });
}

// Show error messages
function showError(message: string): void {
    alert(message); // Replace with a better error display mechanism
}

// Initialize
fetchUserProfile();
updateSummary();