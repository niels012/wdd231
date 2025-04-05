document.getElementById('gcashForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const transaction = {
      date: document.getElementById('date').value,
      type: document.getElementById('type').value,
      mobile: document.getElementById('mobile').value,
      amount: document.getElementById('amount').value,
      fee: document.getElementById('fee').value || '0',
      receiver: document.getElementById('receiver').value,
      reference: document.getElementById('reference').value
    };
  
    // Make sure to update this URL with your Vercel deployment URL
    fetch('https://your-vercel-app.vercel.app/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transaction)
    })
    .then(response => response.json())
    .then(data => {
      alert('Transaction saved successfully!');
      document.getElementById('gcashForm').reset();
    })
    .catch(error => {
      console.error('Error submitting transaction:', error);
      alert('Failed to save transaction.');
    });
  });
  