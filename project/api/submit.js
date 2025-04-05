// In-memory storage (temporary solution for testing)
let transactions = [];  // This will store transactions for the lifetime of the function

module.exports = async (req, res) => {
  // Enable CORS headers to allow requests from other origins (like your GitHub Pages)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request (CORS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle POST request
  if (req.method === 'POST') {
    try {
      // Ensure the body is parsed correctly (it should be a JSON object)
      const newTransaction = req.body;

      // Add the new transaction to the in-memory array
      transactions.push(newTransaction);

      // Log the current transactions (you can remove this later)
      console.log('Current transactions:', transactions);

      // Return success response
      return res.status(200).json({ message: 'Transaction saved successfully' });
    } catch (error) {
      console.error('Error saving transaction:', error);
      return res.status(500).json({ error: 'Failed to save transaction' });
    }
  } else {
    // If the method is not POST, return Method Not Allowed
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};

