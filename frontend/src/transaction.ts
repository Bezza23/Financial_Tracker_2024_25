// expense.ts

const API_BASE_URL = 'http://localhost:3333/transactions'; // Replace with your actual API URL

interface Expense {
    id: number;
    amount: number;
    type: string;
    description: string;
}

async function fetchExpenses(): Promise<Expense[]> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch expenses');
    }
    return await response.json();
}

async function addExpense(expense: Expense): Promise<Expense> {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
    });
    if (!response.ok) {
        throw new Error('Failed to add expense');
    }
    return await response.json();
}

async function updateExpense(expense: Expense): Promise<Expense> {
    const response = await fetch(`${API_BASE_URL}/${expense.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
    });
    if (!response.ok) {
        throw new Error('Failed to update expense');
    }
    return await response.json();
}

async function deleteExpense(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete expense');
    }
}

// Example usage
// fetchExpenses().then(expenses => console.log(expenses));