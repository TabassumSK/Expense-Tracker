
// /* 1. Select HTML elements */
// const form = document.getElementById("expense-form");
// const descriptionInput = document.getElementById("description");
// const amountInput = document.getElementById("amt");
// const dateInput = document.getElementById("date");

// const balanceElement = document.getElementById("total-balance");
// const incomeElement = document.getElementById("total-income");
// const expensesElement = document.getElementById("total-expenses");
// const expenseList = document.getElementById("expense-list");


// /* 2. Store entries */
// let expenses = [];


// /* 3. Handle form submission */
// form.addEventListener("submit", function (event) {
//     event.preventDefault();
//     console.log(amountInput.value);

//     // Read input values
//     // Validate the amount
//     // Create an expense object
//     // Add the object to the expenses array
//     expenses.push(amountInput.value);
//     // Update the UI
//     expensesElement.textContent = amountInput.value;
   
//     // Reset the form
    
// });


// /* 4. Create an expense object */
// // Example structure:
// // {
// //     id: Date.now(),
// //     description: "Groceries",
// //     amount: 500,
// //     date: "2026-10-22"
// // }


// /* 5. Display entries */
// function displayExpenses() {
//     // Loop through expenses
//     // Display each entry inside expenseList
// }


// /* 6. Calculate totals */
// function calculateTotals() {
//     // Use reduce() to calculate total expenses
//     // Calculate income if you add income entries
//     // Balance = income - expenses
//     // Update the total elements
// }


// /* 7. Delete an entry */
// function deleteExpense(id) {
//     // Use filter() to remove the matching entry
//     // Refresh the displayed list and totals
// }




/* 1. Select HTML elements */
const form = document.getElementById("expense-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amt");
const dateInput = document.getElementById("date");

const balanceElement = document.getElementById("total-balance");
const incomeElement = document.getElementById("total-income");
const expensesElement = document.getElementById("total-expenses");
const expenseList = document.getElementById("expense-list");

const incomeButton = document.getElementById("inc-btn");

const income = 0.00;
incomeButton.addEventListener("click", () => {
    income = prompt("Enter your income");
});
console.log(income);


/* 2. Store entries */
// Load previously saved expenses, or start with an empty array.
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];


/* 3. Handle form submission */
form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Read input values
    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    // Validate the input
    if (!description || !date || !Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a description, a valid amount, and a date.");
        return;
    }

    // Create an expense object
    const expense = {
        id: Date.now(),
        description: description,
        amount: amount,
        date: date
    };

    // Add the object to the array
    expenses.push(expense);

    // Save and update the UI
    saveExpenses();
    displayExpenses();
    calculateTotals();

    // Reset the form
    form.reset();
});


/* 4. Save entries in localStorage */
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}


/* 5. Display entries */
function displayExpenses() {
    // Clear the previous list before rendering again
    expenseList.innerHTML = "";

    if (expenses.length === 0) {
        expenseList.textContent = "No expenses added yet.";
        return;
    }

    // Loop through every expense
    expenses.forEach(function (expense) {
        const entry = document.createElement("div");
        entry.className =
            "d-flex justify-content-between align-items-center border rounded p-3 mb-2";

        const details = document.createElement("div");

        const name = document.createElement("strong");
        name.textContent = expense.description;

        const dateText = document.createElement("p");
        dateText.className = "mb-0 text-muted small";
        dateText.textContent = expense.date;

        details.append(name, dateText);

        const rightSide = document.createElement("div");
        rightSide.className = "d-flex align-items-center gap-3";

        const amountText = document.createElement("span");
        amountText.className = "text-danger fw-bold";
        amountText.textContent =
            "-₹" + expense.amount.toFixed(2);

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "btn btn-sm btn-outline-danger";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            deleteExpense(expense.id);
        });

        rightSide.append(amountText, deleteButton);
        entry.append(details, rightSide);

        expenseList.appendChild(entry);
    });
}


/* 6. Calculate totals */
function calculateTotals() {
    // Add all expense amounts
    const totalExpenses = expenses.reduce(function (total, expense) {
        return total + expense.amount;
    }, 0);

    // Income feature has not been implemented yet
    const totalIncome = income;

    // Balance = income - expenses
    const balance = totalIncome - totalExpenses;

    // Update the page2
    balanceElement.textContent = "$" + balance.toFixed(2);
    incomeElement.textContent = "$" + totalIncome;
    expensesElement.textContent = "$" + totalExpenses.toFixed(2);
}


/* 7. Delete an entry */
function deleteExpense(id) {
    // Keep every expense except the one being deleted
    expenses = expenses.filter(function (expense) {
        return expense.id !== id;
    });

    // Save changes and refresh the UI
    saveExpenses();
    displayExpenses();
    calculateTotals();
}


/* 8. Display saved data when the page loads */
displayExpenses();
calculateTotals();
