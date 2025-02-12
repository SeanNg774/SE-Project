document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const payMethod = document.getElementById("payMethod");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        const selectedMethod = payMethod.value;

        if (selectedMethod === "Card" || selectedMethod === "E-Wallet") {
            openPaymentPopup("card-ewallet-popup");
        } else if (selectedMethod === "Cash") {
            openPaymentPopup("cash-popup");
        }
    });

    function openPaymentPopup(popupId) {
        document.getElementById(popupId).style.display = "block";
    }

    // Close payment popups when clicking "×"
    document.querySelectorAll(".close-popup").forEach((button) => {
        button.addEventListener("click", function () {
            this.closest(".popup").style.display = "none";
        });
    });

    // Handle payment submission for both popups
    document.querySelectorAll(".popup .submit-payment").forEach((button) => {
        button.addEventListener("click", function () {
            const popup = this.closest(".popup");
            const amountField = popup.querySelector("#payAmount");

            if (!amountField || amountField.value.trim() === "") {
                alert("Please enter a payment amount.");
                return;
            }

            if (popup.id === "card-ewallet-popup") {
                const yearField = popup.querySelector("#year");
                if (!yearField || yearField.value.trim() === "") {
                    alert("Please enter the payment year.");
                    return;
                }
            }

            if (popup.id === "cash-popup") {
                const payIDField = popup.querySelector("#payID");
                if (!payIDField || payIDField.value.trim() === "") {
                    alert("Please enter a payment ID.");
                    return;
                }
            }

            popup.style.display = "none"; 
            showSuccessPopup(); // Show success message
        });
    });

    function showSuccessPopup() {
        document.getElementById("success-popup").style.display = "block";
    }

    function redirectToHome() {
        // **PUT YOUR HOMEPAGE URL BELOW**
        window.location.href = "mainpageparent.html"; // <-- Replace with your homepage URL
    }

    // **Fix: Ensure the success popup OK button only closes and redirects**
    document.getElementById("success-popup-ok").addEventListener("click", function () {
        document.getElementById("success-popup").style.display = "none";
        setTimeout(redirectToHome, 300); // Redirect smoothly after closing
    });
});
