document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generateButton');
    const printButton = document.getElementById('printButton');
    const reportTypeInput = document.getElementById('reportType');
    const dateFilterInput = document.getElementById('dateFilter');
    const reportTable = document.getElementById('reportTable');

    const filterData = () => {
        const reportTypeValue = reportTypeInput.value;
        const dateValue = dateFilterInput.value;
        const rows = reportTable.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            let match = true;

            if (dateValue && cells[5].textContent.split(' ')[0] !== dateValue.split(' ')[0]) {
                match = false;
            }

            // Add more conditions based on report type if needed
            // if (reportTypeValue && !cells[X].textContent.includes(reportTypeValue)) {
            //     match = false;
            // }

            rows[i].style.display = match ? '' : 'none';
        }
    };

    generateButton.addEventListener('click', filterData);

    printButton.addEventListener('click', () => {
        // Check if html2canvas and jspdf are available
        if (typeof html2canvas === 'undefined' || typeof jspdf === 'undefined') {
            alert('Please include html2canvas and jspdf libraries.');
            return;
        }

        html2canvas(reportTable, {
            scrollY: -window.scrollY,
            windowWidth: window.innerWidth,
            height: reportTable.offsetHeight
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jspdf.jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height);
            pdf.save('report.pdf');
        });
    });
});