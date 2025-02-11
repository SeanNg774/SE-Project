function editTable() {
    let table = document.getElementById("dataTable");
    let cells = table.querySelectorAll("tbody td:not(.non-editable)");

    cells.forEach(cell => {
        cell.contentEditable = "true";
        cell.addEventListener("input", updateTotal);
    });

    document.getElementById("edit-button").classList.add("hidden");
    document.getElementById("save-button").classList.remove("hidden");
}

function saveTable() {
    let table = document.getElementById("dataTable");
    let cells = table.querySelectorAll("tbody td:not(.non-editable)");

    cells.forEach(cell => {
        cell.contentEditable = "false";
    });

    document.getElementById("edit-button").classList.remove("hidden");
    document.getElementById("save-button").classList.add("hidden");
}

function updateTotal(event) {
    let row = event.target.parentElement;
    let cells = row.getElementsByTagName("td");

    let curriculum = validateNumber(cells[1]);
    let additionalFee = validateNumber(cells[2]);
    let discount = validateNumber(cells[3]);
    let penalty = validateNumber(cells[4]);

    let total = (curriculum + additionalFee + penalty) - discount;

    cells[5].innerText = total.toFixed(2);
}

function validateNumber(cell) {
    let value = cell.innerText.trim();

    if (isNaN(value)) {
        alert("Invalid input! Please enter a number.");
        cell.innerText = "0";
        return 0;
    }

    return parseFloat(value);
}