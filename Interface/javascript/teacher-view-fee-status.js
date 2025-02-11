document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const classSection = document.getElementById('classSection');
    const status = document.getElementById('status');
    const feeStatusTableBody = document.getElementById('feeStatusTable').getElementsByTagName('tbody')[0];

    const filterData = () => {
        const searchValue = searchInput.value.toLowerCase();
        const classValue = classSection.value;
        const statusValue = status.value;
        const rows = feeStatusTableBody.getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            let match = true;

            if (searchValue && !(cells[0].textContent.toLowerCase().includes(searchValue) || cells[1].textContent.toLowerCase().includes(searchValue))) {
                match = false;
            }

            if (classValue && cells[2].textContent !== classValue) {
                match = false;
            }

            if (statusValue && cells[8].textContent !== statusValue) {
                match = false;
            }

            rows[i].style.display = match ? '' : 'none';
        }
    };

    searchButton.addEventListener('click', filterData);
    classSection.addEventListener('change', filterData);
    status.addEventListener('change', filterData);
});