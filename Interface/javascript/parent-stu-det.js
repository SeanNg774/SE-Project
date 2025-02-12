document.addEventListener("DOMContentLoaded", () => {
    const editButton = document.getElementById("edit-button");
    const saveButton = document.getElementById("save-button");
    const editableFields = document.querySelectorAll(".editable");
  
    editButton.addEventListener("click", () => {
      editableFields.forEach(field => {
        field.setAttribute("contenteditable", "true");
      });
  
      editButton.classList.add("hidden");
      saveButton.classList.remove("hidden");
    });
  
    saveButton.addEventListener("click", () => {
      editableFields.forEach(field => {
        field.setAttribute("contenteditable", "false");
      });
  
      editButton.classList.remove("hidden");
      saveButton.classList.add("hidden");
  
      // Optional: Send data to server
      const updatedData = {};
      editableFields.forEach(field => {
        updatedData[field.id] = field.innerText;
      });
  
      console.log("Updated Data:", updatedData);
  
      // Send to server (uncomment if needed)
      // fetch("/api/update-student-details", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(updatedData),
      // }).then(response => response.json())
      //   .then(data => console.log("Server Response:", data))
      //   .catch(error => console.error("Error:", error));
    });
  });
  