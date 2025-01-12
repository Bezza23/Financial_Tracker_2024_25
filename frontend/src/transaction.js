// Variables for Expense Management
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let nextId = expenses.length ? expenses[expenses.length - 1].id + 1 : 1; // Initialize nextId

// Event Listener for Form Submission
document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const amount = Number(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;

    const expense = { id: nextId++, amount, type, description };
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses)); // Save to local storage
    renderExpenses();
    this.reset();
});

// Function to Render Expenses
function renderExpenses() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';
    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerText = `${expense.amount} - ${expense.type}: ${expense.description}`;
        
        // Edit Button
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-warning btn-sm';
        editButton.innerText = 'Edit';
        editButton.onclick = () => editExpense(expense.id);

        // Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = () => deleteExpense(expense.id);

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        expenseList.appendChild(li);
    });
}

// Function to Edit Expense
function editExpense(id) {
    const expense = expenses.find(e => e.id === id);
    if (expense) {
        document.getElementById('amount').value = expense.amount.toString();
        document.getElementById('type').value = expense.type;
        document.getElementById('description').value = expense.description;
        deleteExpense(id); // Remove from current list
    }
}

// Function to Delete Expense
function deleteExpense(id) {
    expenses = expenses.filter(e => e.id !== id);
    localStorage.setItem('expenses', JSON.stringify(expenses)); // Update local storage
    renderExpenses();
}

// Load expenses on page load
renderExpenses();