document.getElementById('gcashForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const transaction = {
    date: document.getElementById('date').value,
    type: document.getElementById('type').value,
    mobile: document.getElementById('mobile').value,
    amount: parseFloat(document.getElementById('amount').value),
    fee: parseFloat(document.getElementById('fee').value) || 0,
    receiver: document.getElementById('receiver').value,
    reference: document.getElementById('reference').value,
  };

  fetch('https://api.sheetbest.com/sheets/966ece14-f512-4baf-b3fb-37375078de68', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transaction)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    alert('Transaction saved successfully!');
    document.getElementById('gcashForm').reset();
  })
  .catch(error => {
    console.error('Error submitting transaction:', error);
    alert('Failed to save transaction.');
  });
});
