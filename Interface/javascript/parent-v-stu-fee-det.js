document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#feeTable tbody");

    // Function to fetch student fee details from the server
    async function fetchFeeData() {
        try {
            const response = await fetch("/api/getStudentFees"); // API endpoint to fetch data
            const data = await response.json();

            tableBody.innerHTML = ""; // Clear existing rows

            data.forEach((row) => {
                const newRow = document.createElement("tr");

                newRow.innerHTML = `
                    <td>${row.year}</td>
                    <td>${row.curriculum}</td>
                    <td>${row.additionalFees}</td>
                    <td>${row.discount}</td>
                    <td>${row.penalty}</td>
                    <td>${row.totalAmount}</td>
                    <td>${row.feeDue}</td>
                    <td>${row.paymentStatus}</td>
                `;
                tableBody.appendChild(newRow);
            });

        } catch (error) {
            console.error("Error fetching data:", error);
            tableBody.innerHTML = "<tr><td colspan='8'>Failed to load data.</td></tr>";
        }
    }

    fetchFeeData(); // Load data on page load
});
