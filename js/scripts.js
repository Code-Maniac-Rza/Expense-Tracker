document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('add-expense-form');
    const expensesList = document.getElementById('expenses');
    const totalAmountElem = document.getElementById('total-amount');
    const foodAmountElem = document.getElementById('food-amount');
    const transportAmountElem = document.getElementById('transport-amount');
    const entertainmentAmountElem = document.getElementById('entertainment-amount');
    const utilitiesAmountElem = document.getElementById('utilities-amount');
    const otherAmountElem = document.getElementById('other-amount');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
    
        const name = document.getElementById('expense-name').value.trim();
        const amount = parseFloat(document.getElementById('expense-amount').value);
        const category = document.getElementById('expense-category').value;
    
        if (name !== '' && amount > 0) {
            const expense = { name, amount, category };
            expenses.push(expense);
    
            addExpenseToList(expense);
            updateSummary();
    
            form.reset();
            
            // Save expenses to localStorage
            localStorage.setItem('expenses', JSON.stringify(expenses));
            
            alert("Amount added successfully!");
        } else {
            alert("Please enter a valid name and amount.");
        }
    });
    
    function addExpenseToList(expense) {
        const li = document.createElement('li');
        li.textContent = `${expense.name}: SEK ${expense.amount.toFixed(2)} (${expense.category})`;
        li.setAttribute('tabindex', '0'); // For accessibility
        expensesList.appendChild(li);
    }

    function updateSummary() {
        const summary = calculateSummary(expenses);
        displaySummary(summary);
    }
    
    function calculateSummary(expenses) {
        let totalAmount = 0, foodAmount = 0, transportAmount = 0, entertainmentAmount = 0, utilitiesAmount = 0, otherAmount = 0;
    
        expenses.forEach(expense => {
            totalAmount += expense.amount;
            switch (expense.category) {
                case 'Food':
                    foodAmount += expense.amount;
                    break;
                case 'Transport':
                    transportAmount += expense.amount;
                    break;
                case 'Entertainment':
                    entertainmentAmount += expense.amount;
                    break;
                case 'Utilities':
                    utilitiesAmount += expense.amount;
                    break;
                case 'Other':
                    otherAmount += expense.amount;
                    break;
            }
        });
    
        return { totalAmount, foodAmount, transportAmount, entertainmentAmount, utilitiesAmount, otherAmount };
    }
    
    function displaySummary(summary) {
        totalAmountElem.textContent = summary.totalAmount.toFixed(2);
        foodAmountElem.textContent = summary.foodAmount.toFixed(2);
        transportAmountElem.textContent = summary.transportAmount.toFixed(2);
        entertainmentAmountElem.textContent = summary.entertainmentAmount.toFixed(2);
        utilitiesAmountElem.textContent = summary.utilitiesAmount.toFixed(2);
        otherAmountElem.textContent = summary.otherAmount.toFixed(2);
    }

    // Initial load
    expenses.forEach(expense => addExpenseToList(expense));
    updateSummary();
});
