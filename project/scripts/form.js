// Fee calculation based on the amount
function calculateFee(amount) {
  const feeBrackets = [
    { min: 1, max: 100, fee: 5 },
    { min: 101, max: 500, fee: 10 },
    { min: 501, max: 1000, fee: 15 },
    { min: 1001, max: 1500, fee: 20 },
    { min: 1501, max: 2000, fee: 30 },
    { min: 2001, max: 2500, fee: 40 },
    { min: 2501, max: 3000, fee: 50 },
    { min: 3001, max: 3500, fee: 60 },
    { min: 3501, max: 4000, fee: 70 },
    { min: 4001, max: 4500, fee: 80 },
    { min: 4501, max: 5000, fee: 90 },
    { min: 5001, max: 5500, fee: 100 },
    { min: 5501, max: 6000, fee: 110 },
    { min: 6001, max: 6500, fee: 120 },
    { min: 6501, max: 7000, fee: 130 },
    { min: 7001, max: 7500, fee: 140 },
    { min: 7501, max: 8000, fee: 150 },
    { min: 8001, max: 8500, fee: 160 },
    { min: 8501, max: 9000, fee: 170 },
    { min: 9001, max: 9500, fee: 180 },
    { min: 9501, max: 10000, fee: 190 },
    { min: 10001, max: 10500, fee: 200 },
    { min: 10501, max: 11000, fee: 210 },
    { min: 11001, max: 11500, fee: 220 },
    { min: 11501, max: 12000, fee: 230 },
    { min: 12001, max: 12500, fee: 240 },
    { min: 12501, max: 13000, fee: 250 },
    { min: 13001, max: 13500, fee: 260 },
    { min: 13501, max: 14000, fee: 270 },
    { min: 14001, max: 14500, fee: 280 },
    { min: 14501, max: 15000, fee: 290 }
  ];

  for (const bracket of feeBrackets) {
    if (amount >= bracket.min && amount <= bracket.max) {
      return bracket.fee;
    }
  }

  return 0;
}

// Update fee display on amount input
document.getElementById('amount').addEventListener('input', function () {
  const amount = parseFloat(this.value);

  if (amount > 15000) {
    alert("Amount should not exceed ₱15,000.");
    this.value = '';
    document.getElementById('feeDisplay').textContent = 'Fee: ₱0';
    return;
  }

  const fee = !isNaN(amount) ? calculateFee(amount) : 0;
  document.getElementById('feeDisplay').textContent = `Fee: ₱${fee}`;
});

  document.getElementById('receiver').addEventListener('input', function () {
    this.value = this.value.replace(/[^A-Za-z\s]/g, '');
  });

  document.getElementById('mobile').addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
  });

const today = new Date().toISOString().split('T')[0];
document.getElementById('date').value = today;

// Handle form submission
document.getElementById('gcashForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';

  const amountValue = parseFloat(document.getElementById('amount').value);
  const feeValue = calculateFee(amountValue);

  const transaction = {
    date: document.getElementById('date').value,
    type: document.getElementById('type').value,
    mobile: document.getElementById('mobile').value,
    amount: amountValue,
    fee: feeValue,
    receiver: document.getElementById('receiver').value,
    reference: document.getElementById('reference').value,
    timestamp: new Date().toISOString()
  };

  // Basic validation
  if (
    !transaction.date ||
    !transaction.type ||
    !transaction.mobile ||
    isNaN(transaction.amount)
  ) {
    alert("Please fill out all required fields correctly.");
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit';
    return;
  }

  // Check max amount
  if (transaction.amount > 15000) {
    alert("Amount exceeds the maximum allowed limit of ₱15,000.");
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit';
    return;
  }

  fetch('https://api.sheetbest.com/sheets/cff70daf-6fbb-4c62-adec-c2582aaae6ad', {
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
    .then(() => {
      alert('Transaction saved successfully!');
      form.reset();
      document.getElementById('feeDisplay').textContent = 'Fee: ₱0';
    })
    .catch(error => {
      console.error('Error submitting transaction:', error);
      alert('Failed to save transaction.');
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit';
    });
});
