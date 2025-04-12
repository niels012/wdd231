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

        if (entry.type.toLowerCase() === "cash in") {
          totalIn += amount;
          totalFee += fee;
        } else if (entry.type.toLowerCase() === "cash out") {
          totalOut += amount;
          totalFee += fee;
        }
      });

      currentCOH = capitalCOH + (totalIn - totalOut) + totalFee;
      currentWallet = capitalWallet + (totalOut - totalIn);

      // Update UI
      document.getElementById("wallet-bal").textContent = `GCash Wallet Bal: ₱${currentWallet.toLocaleString()}`;
      document.getElementById("COH").textContent = `Cash on Hand: ₱${currentCOH.toLocaleString()}`;
      document.getElementById("totalCommission").textContent = `Total Commission: ₱${totalFee.toLocaleString()}`;

      // Bar Chart
      const ctx = document.getElementById("transactionChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Cash In", "Cash Out"],
          datasets: [{
            label: "Total Amount",
            data: [totalIn, totalOut],
            backgroundColor: ["#28a745", "#dc3545"]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Total Cash In vs Cash Out"
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      // Pie Chart
      const pieCtx = document.getElementById("balanceChart").getContext("2d");
      new Chart(pieCtx, {
        type: "pie",
        data: {
          labels: ["Cash on Hand", "GCash Wallet"],
          datasets: [{
            data: [currentCOH, currentWallet],
            backgroundColor: ["#007bff", "#17a2b8"]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Current Balance Breakdown"
            }
          }
        }
      });
    })
    .catch(error => {
      console.error("Failed to fetch data:", error);
    });
});
