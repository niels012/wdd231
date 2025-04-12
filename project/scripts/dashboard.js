document.addEventListener("DOMContentLoaded", () => {
  const SHEET_URL = "https://api.sheetbest.com/sheets/cff70daf-6fbb-4c62-adec-c2582aaae6ad";

  fetch(SHEET_URL)
    .then(response => response.json())
    .then(data => {
      let totalIn = 0;
      let totalOut = 0;
      let totalFee = 0;
      let capitalWallet = 5000;
      let capitalCOH = 5000;
      let currentWallet = 0;
      let currentCOH = 0;

      data.forEach(entry => {
        const amount = parseFloat(entry.amount || 0);
        const fee = parseFloat(entry.fee || 0);

        if (entry.type === "Cash In") {
          totalIn += amount;
          totalFee += fee;
        } else if (entry.type === "Cash Out") {
          totalOut += amount;
          totalFee += fee;
        }
      });

      currentWallet = capitalWallet - totalOut;
      currentCOH = capitalCOH - totalIn + totalFee;
      // const balance = currentWallet + currentCOH;

      document.getElementById("wallet-bal").textContent = `GCash Wallet Bal: ₱${currentWallet.toLocaleString()}`;
      document.getElementById("COH").textContent = `Cash on Hand: ₱${currentCOH.toLocaleString()}`;
      document.getElementById("totalCommission").textContent = `Total Commision: ₱${totalFee.toLocaleString()}`;
    })
    .catch(error => {
      console.error("Failed to fetch data:", error);
    });
});
