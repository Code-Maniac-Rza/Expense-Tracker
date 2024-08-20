document.addEventListener('DOMContentLoaded', () => {
    const budgetForm = document.getElementById('set-budget-form');
    const budgetList = document.getElementById('budget-list');
    const overallBudgetStatus = document.getElementById('overall-budget-status');

    let budgets = JSON.parse(localStorage.getItem('budgets')) || {};
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    budgetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const category = document.getElementById('budget-category').value;
        const amount = parseFloat(document.getElementById('budget-amount').value);

        if (amount > 0) {
            budgets[category] = amount;
            localStorage.setItem('budgets', JSON.stringify(budgets));
            updateBudgetList();
        } else {
            alert('Please enter a valid budget amount.');
        }

        budgetForm.reset();
    });

    function updateBudgetList() {
        budgetList.innerHTML = '';
        let totalBudget = 0;
        let totalSpent = 0;

        for (const category in budgets) {
            const budgetAmount = budgets[category];
            const spentAmount = calculateCategorySpent(category);

            totalBudget += budgetAmount;
            totalSpent += spentAmount;

            const li = document.createElement('li');
            li.innerHTML = `
                ${category}: Budget - SEK ${budgetAmount.toFixed(2)}, Spent - SEK ${spentAmount.toFixed(2)}
                <span style="color: ${spentAmount > budgetAmount ? 'red' : 'green'}">
                    (${spentAmount > budgetAmount ? 'Over' : 'Under'} Budget)
                </span>
            `;
            budgetList.appendChild(li);
        }

        overallBudgetStatus.textContent = `Total Budget: SEK ${totalBudget.toFixed(2)}, Total Spent: SEK ${totalSpent.toFixed(2)} (${totalSpent > totalBudget ? 'Over' : 'Under'} Budget)`;
    }

    function calculateCategorySpent(category) {
        return expenses
            .filter(expense => expense.category === category)
            .reduce((total, expense) => total + expense.amount, 0);
    }

    // Initial load
    updateBudgetList();
});
