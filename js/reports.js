document.addEventListener('DOMContentLoaded', () => {
    const totalAmountElem = document.getElementById('total-amount-report');
    const foodAmountElem = document.getElementById('food-amount-report');
    const transportAmountElem = document.getElementById('transport-amount-report');
    const entertainmentAmountElem = document.getElementById('entertainment-amount-report');
    const utilitiesAmountElem = document.getElementById('utilities-amount-report');
    const otherAmountElem = document.getElementById('other-amount-report');

    // Load expenses from localStorage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Calculate the summary
    const summary = calculateSummary(expenses);
    displaySummary(summary);

    // Create the chart
    createChart(summary);

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

    function createChart(summary) {
        const ctx = document.getElementById('expensesChart').getContext('2d');
        const data = {
            labels: ['Food', 'Transport', 'Entertainment', 'Utilities', 'Other'],
            datasets: [{
                label: 'Expenses (SEK)',
                data: [
                    summary.foodAmount,
                    summary.transportAmount,
                    summary.entertainmentAmount,
                    summary.utilitiesAmount,
                    summary.otherAmount
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        };

        const config = {
            type: 'bar', // Change to 'pie' or 'doughnut' for different visualizations
            data: data,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };

        new Chart(ctx, config);
    }
});
