// api/submit.js
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); // or specify your GitHub Pages URL
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const filePath = path.join(process.cwd(), 'data', 'transaction.json');
      const data = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '[]';
      const transactions = JSON.parse(data);

      const newTransaction = req.body;
      transactions.push(newTransaction);

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
