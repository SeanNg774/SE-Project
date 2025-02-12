document.addEventListener("DOMContentLoaded", () => {
    const noticeContainer = document.querySelector(".inner-layout");

    function fetchNotices() {
        fetch("http://localhost:5500/api/payment-notices") // Adjust API URL as needed
            .then(response => response.json())
            .then(data => {
                // Clear existing notices before adding new ones
                noticeContainer.innerHTML = "";

                // Loop through each notice and create a new div
                data.forEach(notice => {
                    const noticeDiv = document.createElement("div");
                    noticeDiv.classList.add("notice");

                    noticeDiv.innerHTML = `
                        <h2>Payment Notice</h2>
                        <div>
                            <span>${notice.message}</span>
                        </div>
                    `;

                    noticeContainer.appendChild(noticeDiv);
                });
            })
            .catch(error => console.error("Error fetching notices:", error));
    }

    // Fetch notices when page loads
    fetchNotices();

    // Refresh notices every 30 seconds to check for updates
    setInterval(fetchNotices, 30000);
});
