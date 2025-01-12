// Variables for Income and Expense Management
let incomes = [];
let expenses = JSON.parse(localStorage.getItem('expenses')) || []; // Load expenses from local storage
let nextIncomeId = 1;
let nextExpenseId = 1;

// Event Listeners
document.getElementById('incomeButton').addEventListener('click', showIncomeSection);
document.getElementById('expenseButton').addEventListener('click', showExpenseSection);
document.getElementById('incomeForm').addEventListener('submit', addIncome);
document.getElementById('expenseForm').addEventListener('submit', addExpense);

// Show Income Section
function showIncomeSection() {
    document.getElementById('incomeSection').style.display = 'block';  // Show income section
    document.getElementById('expenseSection').style.display = 'none';  // Hide expense section
    updateSummary();  // Update summary report
}

// Show Expense Section
function showExpenseSection() {
    document.getElementById('expenseSection').style.display = 'block';  // Show expense section
    document.getElementById('incomeSection').style.display = 'none';    // Hide income section
    updateSummary();  // Update summary report
}

// Add Income
function addIncome(event) {
    event.preventDefault();  // Prevent default form submission
    const amount = Number(document.getElementById('incomeAmount').value);
    const source = document.getElementById('incomeSourceInput').value;
    const description = document.getElementById('incomeDescription').value;

    const income = { id: nextIncomeId++, amount, source, description };
    incomes.push(income);  // Add income to the array
    renderIncomes();  // Update displayed income list
    this.reset();  // Reset form fields
    updateSummary();  // Update summary report
}

// Render Incomes
function renderIncomes() {
    const incomeList = document.getElementById('incomeList');
    incomeList.innerHTML = '';  // Clear existing list
    incomes.forEach(income => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerText = `${income.amount} - ${income.source}: ${income.description}`;
        incomeList.appendChild(li);  // Append new income item
    });
}

// Add Expense
function addExpense(event) {
    event.preventDefault();  // Prevent default form submission
    const amount = Number(document.getElementById('expenseAmount').value);
    const type = document.getElementById('expenseType').value;
    const description = document.getElementById('expenseDescriptionInput').value;

    const expense = { id: nextExpenseId++, amount, type, description };
    expenses.push(expense);  // Add expense to the array
    localStorage.setItem('expenses', JSON.stringify(expenses)); // Save to local storage
    renderExpenses();  // Update displayed expense list
    this.reset();  // Reset form fields
    updateSummary();  // Update summary report
}

// Render Expenses
function renderExpenses() {
    const expenseList = document.getElementById('expenseReasons'); // Adjust this ID as needed
    expenseList.innerHTML = '';  // Clear existing list
    expenses.forEach(expense => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${expense.type}</td><td>${expense.amount}</td>`;
        expenseList.appendChild(tr);  // Append new expense item
    });
}

// Update Summary
function updateSummary() {
    const summaryReport = document.getElementById('summaryReport');
    summaryReport.innerHTML = '';  // Clear existing summary

    // Display Income Sources with Amounts
    const incomeSummary = incomes.reduce((acc, income) => {
        acc[income.source] = (acc[income.source] || 0) + income.amount;
        return acc;
    }, {});

    for (const [source, amount] of Object.entries(incomeSummary)) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>Income</td><td>${source}</td><td>${amount}</td>`;
        summaryReport.appendChild(tr);  // Append income summary row
    }

    // Display Expense Reasons with Amounts
    const expenseSummary = expenses.reduce((acc, expense) => {
        acc[expense.type] = (acc[expense.type] || 0) + expense.amount;
        return acc;
    }, {});

    for (const [type, amount] of Object.entries(expenseSummary)) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>Expense</td><td>${type}</td><td>${amount}</td>`;
        summaryReport.appendChild(tr);  // Append expense summary row
    }

    // Calculate Totals
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById('totalIncome').innerText = totalIncome;  // Update total income
    document.getElementById('totalExpenses').innerText = totalExpenses;  // Update total expenses
}

// Initialize
updateSummary();  // Initial call to set up summary