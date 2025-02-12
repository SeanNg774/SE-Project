document.addEventListener("DOMContentLoaded", function () {
    const feeTableBody = document.querySelector("#feeTable tbody");
    const searchForm = document.querySelector("#searchForm");
  
    // Fetch data from the database (replace with your API endpoint)
    async function fetchPaymentData() {
      try {
        const response = await fetch("/api/payment-records"); // Update this with your actual API
        const data = await response.json();
  
        // Sort by date (newest to oldest)
        data.sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate));
  
        renderTable(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    // Render table with payment records
    function renderTable(data) {
      feeTableBody.innerHTML = ""; // Clear previous data
      data.forEach((record, index) => {
        const row = document.createElement("tr");
  
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${record.year}</td>
          <td>${record.paymentReference}</td>
          <td>${record.amount}</td>
          <td>${record.paymentDate}</td>
        `;
  
        feeTableBody.appendChild(row);
      });
    }
  
    // Search filter based on the entered date
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const searchDate = new Date(document.querySelector("#date").value);
  
      if (isNaN(searchDate)) {
        alert("Please select a valid date.");
        return;
      }
  
      // Fetch and filter data
      fetch("/api/payment-records")
        .then((response) => response.json())
        .then((data) => {
          const filteredData = data.filter((record) => {
            const recordDate = new Date(record.paymentDate);
            return recordDate <= searchDate; // Include payments before or on the selected date
          });
  
          renderTable(filteredData);
        })
        .catch((error) => console.error("Error filtering data:", error));
    });
  
    fetchPaymentData(); // Load initial data
  });
  