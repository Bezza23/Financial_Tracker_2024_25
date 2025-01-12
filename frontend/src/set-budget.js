// Array to store budgets
const budgets = [];

// Function to add budget and update the list
function addBudget(reason, amount, category) {
    const budget = { reason, amount, category };
    budgets.push(budget);  // Add the budget to the array
    displayBudgets();  // Update the display
}

// Function to display budgets in the list
function displayBudgets() {
    const budgetList = document.getElementById('budgetList');
    budgetList.innerHTML = '';  // Clear the existing list

    // Check if the budgets array is empty
    if (budgets.length === 0) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerText = 'No budgets set.';
        budgetList.appendChild(li);
    } else {
        budgets.forEach(budget => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerText = `${budget.amount} - ${budget.reason} (${budget.category})`;
            budgetList.appendChild(li);
        });
    }
}

// Handle form submission
document.getElementById('budgetForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission

    const reason = document.getElementById('reason').value;
    const amount = Number(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    addBudget(reason, amount, category);  // Add budget to the array
    document.getElementById('message').innerText = `Budget of $${amount} set for ${reason} as ${category}.`;
    this.reset();  // Reset the form
});