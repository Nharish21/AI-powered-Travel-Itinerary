document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("nav ul li a");
    links.forEach(link => {
        link.addEventListener("click", function () {
            links.forEach(l => l.style.color = "white");
            this.style.color = "#f39c12";
        });
    });
    console.log("Welcome to Hari Travels!");
});
