document.addEventListener('DOMContentLoaded', () => {
    const reminderForm = document.getElementById('reminderForm');

    reminderForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        const recipient = document.getElementById('recipient').value;
        const message = document.getElementById('message').value;

        // Check if the recipient is an email address
        const isEmail = recipient.includes('@') && recipient.includes('.');

        let method = 'text message';
        if (isEmail) {
            method = 'email';
        }

        // Here you would typically send the reminder via email or text message
        // For demonstration purposes, we'll just log it to the console
        console.log(`Sending reminder via ${method} to:`, recipient);
        console.log('Message:', message);

        // After sending the reminder, you can show a success message or redirect
        alert(`Reminder sent successfully via ${method}!`);

        // Optionally, clear the form or redirect to another page
        reminderForm.reset();
        // window.location.href = 'mainpageteacher.html';
    });
});