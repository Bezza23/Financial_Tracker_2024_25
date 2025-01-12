// set_budget.ts

const API_BASE_URL = 'https://your-api-url.com/api/budgets'; // Replace with your actual API URL

interface Budget {
    reason: string;
    amount: number;
    category: 'income' | 'expense';
}

async function fetchBudgets(): Promise<Budget[]> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch budgets');
    }
    return await response.json();
}

async function addBudget(budget: Budget): Promise<void> {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(budget),
    });

    if (!response.ok) {
        throw new Error('Failed to set budget');
    }
}

// Function to update the budget list in the UI
async function updateBudgetList() {
    try {
        const budgets = await fetchBudgets();
        const budgetList = document.getElementById('budgetList') as HTMLUListElement;
        budgetList.innerHTML = ''; // Clear the current list

        budgets.forEach(budget => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerText = `${budget.amount} - ${budget.reason} (${budget.category})`;
            budgetList.appendChild(li);
        });
    } catch (error) {
        console.error(error);
        const message = document.getElementById('message')!;
        message.innerText = `Error fetching budgets: ${error.message}`;
    }
}

// Handle form submission
document.getElementById('budgetForm')!.addEventListener('submit', async function(event) {
    event.preventDefault();

    const reason = (document.getElementById('reason') as HTMLInputElement).value;
    const amount = Number((document.getElementById('amount') as HTMLInputElement).value);
    const category = (document.getElementById('category') as HTMLSelectElement).value as 'income' | 'expense';

    const budget: Budget = { reason, amount, category };

    try {
        await addBudget(budget); // Add budget to the backend
        document.getElementById('message')!.innerText = `Budget of $${amount} set for ${reason} as ${category}.`;
        this.reset(); // Reset the form
        await updateBudgetList(); // Refresh the budget list
    } catch (error) {
        document.getElementById('message')!.innerText = `Error: ${error.message}`;
    }
});

// Fetch and display budgets on initial load
updateBudgetList();