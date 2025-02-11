document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const classSection = document.getElementById('classSection');
    const dateFilter = document.getElementById('dateFilter');
    const paymentTableBody = document.getElementById('paymentTable').getElementsByTagName('tbody')[0];

    const filterData = () => {
        const searchValue = searchInput.value.toLowerCase();
        const classValue = classSection.value;
        const dateValue = dateFilter.value;
        const rows = paymentTableBody.getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            let match = true;

            if (searchValue && !(cells[0].textContent.toLowerCase().includes(searchValue) || cells[1].textContent.toLowerCase().includes(searchValue))) {
                match = false;
            }

            if (classValue && cells[2].textContent !== classValue) {
                match = false;
            }

            if (dateValue && cells[7].textContent !== dateValue) {
                match = false;
            }

            rows[i].style.display = match ? '' : 'none';
        }
    };

    searchButton.addEventListener('click', filterData);
    classSection.addEventListener('change', filterData);
    dateFilter.addEventListener('change', filterData);
});