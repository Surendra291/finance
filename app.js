let transactions = [];

document.getElementById("add-transaction").addEventListener("click", function() {
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    
    if (description === '' || isNaN(amount)) {
        alert("Please provide a valid description and amount.");
        return;
    }
    
    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: amount > 0 ? 'income' : 'expense'
    };
    
    transactions.push(transaction);
    updateUI();
    clearForm();
});

function updateUI() {
    const income = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0);
    const balance = income + expenses;
    
    document.getElementById("total-income").textContent = income.toFixed(2);
    document.getElementById("total-expenses").textContent = Math.abs(expenses).toFixed(2);
    document.getElementById("balance").textContent = balance.toFixed(2);
    
    displayTransactions();
}

function displayTransactions() {
    const transactionList = document.getElementById("transaction-list");
    transactionList.innerHTML = ''; // Clear the table before displaying
    
    transactions.forEach(transaction => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${transaction.description}</td>
            <td>${transaction.amount.toFixed(2)}</td>
            <td>${transaction.type}</td>
            <td><button onclick="deleteTransaction(${transaction.id})">Delete</button></td>
        `;
        transactionList.appendChild(row);
    });
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateUI();
}

function clearForm() {
    document.getElementById("description").value = '';
    document.getElementById("amount").value = '';
}
