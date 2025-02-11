document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-button');
    const printButton = document.getElementById('printButton');
    const invoiceTable = document.getElementById('invoiceTable');
    const monthInput = document.getElementById('month');
    const feeTypeInput = document.getElementById('feeType');

    const filterData = () => {
        const monthValue = monthInput.value;
        const feeTypeValue = feeTypeInput.value;
        const rows = invoiceTable.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            let match = true;

            if (monthValue && cells[5].textContent.split(' ')[0] !== monthValue.split(' ')[0]) {
                match = false;
            }

            if (feeTypeValue && cells[4].textContent !== feeTypeValue) {
                match = false;
            }

            rows[i].style.display = match ? '' : 'none';
        }
    };

    generateButton.addEventListener('click', filterData);

    printButton.addEventListener("click", () => {
        const { jsPDF } = window.jspdf; 
        const doc = new jsPDF();

        if (typeof doc.autoTable !== "function") {
            console.error("Error: autoTable plugin is not loaded.");
            return;
        }

        doc.text("Fee Invoice", 14, 10); // Add title

        doc.autoTable({
            html: "#invoiceTable",
            startY: 20,
            theme: "grid",
            styles: { fontSize: 10, cellPadding: 3 },
            headStyles: { fillColor: [151, 207, 188] },
        });

        doc.save("invoice.pdf");
    });
});