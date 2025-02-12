document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("searchForm");
    const feeTableBody = document.querySelector("#feeTable tbody");

    // Fetch all payment records initially
    fetchPaymentData();

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const selectedDate = document.getElementById("date").value;
        fetchPaymentData(selectedDate);
    });

    function fetchPaymentData(dateFilter = null) {
        fetch("http://localhost:5500/api/payment-records")
            .then(response => response.json())
            .then(data => {
                // Ensure correct date parsing
                if (dateFilter) {
                    const filterDate = new Date(dateFilter).setHours(0, 0, 0, 0); // Normalize to start of day
                    
                    data = data.filter(record => {
                        const recordDate = new Date(record.paymentDate);
                        return recordDate.setHours(0, 0, 0, 0) <= filterDate;
                    });
                }
    
                // Clear existing table data
                feeTableBody.innerHTML = "";
    
                // Populate table
                data.forEach((record, index) => {
                    const row = document.createElement("tr");
    
                    row.innerHTML = `
                        <td>${record.paymentDate}</td>
                        <td>${record.paymentReference}</td>
                        <td>$${record.amount}</td>
                        <td>
                            <button onclick="downloadReceipt('${record.paymentDate}', '${record.paymentReference}', '${record.amount}')">
                                Download
                            </button>
                        </td>
                    `;
    
                    feeTableBody.appendChild(row);
                });
            })
            .catch(error => console.error("Error fetching data:", error));
    }
    
    
});

// Function to generate and download the receipt as a PDF
function downloadReceipt(date, reference, amount) {
    // Ensure jsPDF is loaded
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Receipt content
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Payment Receipt", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 20, 40);
    doc.text(`Reference: ${reference}`, 20, 50);
    doc.text(`Amount Paid: $${amount}`, 20, 60);

    doc.text("-----------------------------", 20, 80);
    doc.text("Thank you for your payment.", 20, 90);

    // Save the PDF file
    doc.save(`Receipt_${reference}.pdf`);
}
