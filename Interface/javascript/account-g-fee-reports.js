document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-button');
    const printButton = document.getElementById('printButton');
    const reportTypeInput = document.getElementById('reportType');
    const dateFilterInput = document.getElementById('dateFilter');
    const reportTable = document.getElementById('reportTable');

    if (!generateButton || !printButton || !reportTable) {
        console.error("Missing required elements in the DOM.");
        return;
    }

    const filterData = () => {
        const reportTypeValue = reportTypeInput.value.trim();
        const dateValue = dateFilterInput.value;
        const rows = reportTable.querySelectorAll("tbody tr");

        rows.forEach(row => {
            const cells = row.getElementsByTagName("td");
            let match = true;

            // Check date filter
            if (dateValue) {
                const dueDate = cells[5]?.textContent.trim();
                const formattedDate = new Date(dueDate).toISOString().split("T")[0];

                if (dateValue !== formattedDate) {
                    match = false;
                }
            }

            row.style.display = match ? "" : "none";
        });
    };

    generateButton.addEventListener("click", filterData);

    printButton.addEventListener("click", () => {
        if (typeof window.jspdf === "undefined" || typeof window.jspdf.jsPDF === "undefined") {
            alert("Please ensure jsPDF and AutoTable are properly included.");
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.text("Fee Report", 14, 10);

        doc.autoTable({
            html: "#reportTable",
            startY: 20,
            theme: "grid",
            styles: { fontSize: 10, cellPadding: 3 },
            headStyles: { fillColor: [151, 207, 188] },
        });

        doc.save("report.pdf");
    });
});
