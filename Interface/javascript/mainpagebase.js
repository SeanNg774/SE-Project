document.getElementById("logout-link").addEventListener("click", function(event) {
    event.preventDefault();
  
    sessionStorage.clear();
    localStorage.clear();
  
    window.location.replace("login.html");
  });