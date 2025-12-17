document.addEventListener("DOMContentLoaded", () => {

    const burger = document.querySelector(".burger");
    const overlayMenu = document.querySelector(".overlay-menu-mobile");
    const links = overlayMenu.querySelectorAll("a");

    const toggleMenu = () => {
        burger.classList.toggle("active");
        overlayMenu.classList.toggle("active");
        document.body.classList.toggle("menu-open");
    };

    burger.addEventListener("click", toggleMenu);

    // Fermer le menu après clic sur un lien
    links.forEach(link => {
        link.addEventListener("click", () => {
            burger.classList.remove("active");
            overlayMenu.classList.remove("active");
            document.body.classList.remove("menu-open");
        });
    });

});
