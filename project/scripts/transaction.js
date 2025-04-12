document.addEventListener("DOMContentLoaded", () => {
  const sheetUrl = "https://api.sheetbest.com/sheets/cff70daf-6fbb-4c62-adec-c2582aaae6ad"; 

  fetch(sheetUrl)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector("#transactionTable tbody");

      data.forEach(entry => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${entry.date}</td>
          <td>${entry.type}</td>
          <td>${entry.mobile}</td>
          <td>${entry.amount}</td>
          <td>${entry.fee}</td>
          <td>${entry.receiver}</td>
          <td>${entry.reference}</td>
          <td>${new Date(entry.timestamp).toLocaleString()}</td>
        `;

        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error("Error fetching data:", error));
});
