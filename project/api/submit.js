// api/submit.js
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Read existing transactions
      const filePath = path.join(__dirname, '..', 'data', 'transaction.json');
      const data = fs.readFileSync(filePath, 'utf8');
      const transactions = JSON.parse(data);

      // Add the new transaction to the list
      const newTransaction = req.body;
      transactions.push(newTransaction);

      // Save the updated list of transactions
      fs.writeFileSync(filePath, JSON.stringify(transactions, null, 2));

      return res.status(200).json({ message: 'Transaction saved successfully' });
    } catch (error) {
      console.error('Error saving transaction:', error);
      return res.status(500).json({ error: 'Failed to save transaction' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};
