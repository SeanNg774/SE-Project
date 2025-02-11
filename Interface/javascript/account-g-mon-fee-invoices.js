document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generateButton');
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

    printButton.addEventListener('click', () => {
        html2canvas(invoiceTable, {
            scrollY: -window.scrollY,
            windowWidth: window.innerWidth,
            height: invoiceTable.offsetHeight
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jspdf.jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height);
            pdf.save('invoice.pdf');
        });
    });
});