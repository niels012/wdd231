const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let totalIn = 0;
let totalOut = 0;

transactions.forEach(tx => {
  const amount = parseFloat(tx.amount);
  if (tx.type.toLowerCase() === 'cash in') totalIn += amount;
  else if (tx.type.toLowerCase() === 'cash out') totalOut += amount;
});

document.getElementById('cash-in').textContent = `Total Cash In: ₱${totalIn.toFixed(2)}`;
document.getElementById('cash-out').textContent = `Total Cash Out: ₱${totalOut.toFixed(2)}`;
document.getElementById('balance').textContent = `Remaining Balance: ₱${(totalIn - totalOut).toFixed(2)}`;
