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

      currentCOH = capitalCOH + (totalIn-totalOut) + totalFee;
      currentWallet = capitalWallet + (totalOut-totalIn);


      // Get the latest transaction type based on the most recent timestamp
      // const sortedData = [...data].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      // const latestEntry = sortedData[0];

      // if (latestEntry && latestEntry.type) {
      //   document.getElementById("latestType").textContent = `Latest Transaction Type: ${latestEntry.type}`;
      //   if (latestEntry.type === "Cash In") {
      //     currentCOH = capitalCOH + (totalIn-totalOut) ;
      //     currentWallet = capitalWallet + (totalOut-totalIn);
      //   } else if (latestEntry.type === "Cash Out") {
      //     currentCOH = capitalCOH + (totalIn-totalOut)  ;
      //     currentWallet = capitalWallet + (totalOut-totalIn);
      //   }
      // } else {
      //   document.getElementById("latestType").textContent = "Latest Transaction Type: N/A";
      // }


      // const balance = currentWallet + currentCOH;

      document.getElementById("wallet-bal").textContent = `GCash Wallet Bal: ₱${currentWallet.toLocaleString()}`;
      document.getElementById("COH").textContent = `Cash on Hand: ₱${currentCOH.toLocaleString()}`;
      document.getElementById("totalCommission").textContent = `Total Commision: ₱${totalFee.toLocaleString()}`;
    })
    .catch(error => {
      console.error("Failed to fetch data:", error);
    });


// Show Graph

fetch(SHEET_URL)
    .then(res => res.json())
    .then(data => {
      let cashInTotal = 0;
      let cashOutTotal = 0;

      data.forEach(entry => {
        const amount = parseFloat(entry.amount) || 0;
        if (entry.type.toLowerCase() === "cash in") cashInTotal += amount;
        if (entry.type.toLowerCase() === "cash out") cashOutTotal += amount;
      });

      // Draw chart
      const ctx = document.getElementById("transactionChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Cash In", "Cash Out"],
          datasets: [{
            label: "Total Amount",
            data: [cashInTotal, cashOutTotal],
            backgroundColor: ["#28a745", "#dc3545"] // green and red
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
    })
    .catch(err => console.error("Error loading data:", err));
  });




