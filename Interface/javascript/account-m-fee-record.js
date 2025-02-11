document.addEventListener('DOMContentLoaded', () => {
    const manageButton = document.getElementById('manageButton');
    const popupForm = document.getElementById('popupForm');
    const closeButton = document.querySelector('.close');
    const cancelButton = document.getElementById('cancelButton');
    const feeRecordForm = document.getElementById('feeRecordForm');

    // Show Popup Form
    manageButton.addEventListener('click', () => {
        popupForm.style.display = 'block';
    });

    // Close Popup Form
    closeButton.addEventListener('click', () => {
        popupForm.style.display = 'none';
    });

    // Cancel Button
    cancelButton.addEventListener('click', () => {
        popupForm.style.display = 'none';
    });

    // Handle Form Submission
    feeRecordForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const studentName = document.getElementById('studentName').value;
        const studentId = document.getElementById('studentId').value;
        const classValue = document.getElementById('class').value;
        const feeTypeValue = document.getElementById('feeType').value;
        const amount = document.getElementById('amount').value;
        const dueDate = document.getElementById('dueDate').value;
        const statusValue = document.getElementById('status').value;

        // Here you would typically send the data to the server
        console.log('New Fee Record:', {
            studentName,
            studentId,
            class: classValue,
            feeType: feeTypeValue,
            amount,
            dueDate,
            status: statusValue
        });

        // After sending the data, you can show a success message or redirect
        alert('Fee record added successfully!');

        // Clear the form and close the popup
        feeRecordForm.reset();
        popupForm.style.display = 'none';
    });
});