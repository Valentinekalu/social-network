// JavaScript code to handle sidebar toggle
document.addEventListener("DOMContentLoaded", function () {
    const sidebarToggle = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");

    sidebarToggle.addEventListener("click", function () {
        sidebar.classList.toggle("active");
    });

    document.addEventListener("click", function (event) {
        if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
            sidebar.classList.remove("active");
        }
    });
});
