// ===============================================
// ZDRAVI RAZUM ERP
// app.js
// ===============================================

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {

    initStorage();

    if (typeof initDashboard === "function") {
        initDashboard();
    }

    if (typeof initDrivers === "function") {
        initDrivers();
    }

    if (typeof initVehicles === "function") {
        initVehicles();
    }

    if (typeof initFinance === "function") {
        initFinance();
    }

    initNavigation();

    initQuickActions();

    initSearch();

    initMobileMenu();

}

// ===============================================
// ZDRAVI RAZUM ERP
// app.js
// ===============================================

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {

    initStorage();

    if (typeof initDashboard === "function") {
        initDashboard();
    }

    if (typeof initDrivers === "function") {
        initDrivers();
    }

    if (typeof initVehicles === "function") {
        initVehicles();
    }

    if (typeof initFinance === "function") {
        initFinance();
    }

    initNavigation();

    initQuickActions();

    initSearch();

    initMobileMenu();

}

function showPage(page) {

    document
        .querySelectorAll(".page")
        .forEach(section => {

            section.style.display = "none";

        });

    const module = document.getElementById(page + "Module");

    if (module) {

        module.style.display = "block";

    }

    if (window.innerWidth < 768) {

        document
            .querySelector(".sidebar")
            .classList.remove("active");

    }

}

// ===============================================
// MOBILE MENU
// ===============================================

function initMobileMenu() {

    const button = document.getElementById("menuToggle");

    const sidebar = document.querySelector(".sidebar");

    if (!button || !sidebar) return;

    button.addEventListener("click", () => {

        sidebar.classList.toggle("active");

    });

}

// ===============================================
// BRZE AKCIJE
// ===============================================

function initQuickActions() {

    document
        .getElementById("quickDriver")
        ?.addEventListener("click", openDriverModal);

    document
        .getElementById("quickVehicle")
        ?.addEventListener("click", openVehicleModal);

    document
        .getElementById("quickFinance")
        ?.addEventListener("click", openFinanceModal);

    document
        .getElementById("newDriverBtn")
        ?.addEventListener("click", openDriverModal);

    document
        .getElementById("newVehicleBtn")
        ?.addEventListener("click", openVehicleModal);

    document
        .getElementById("newFinanceBtn")
        ?.addEventListener("click", openFinanceModal);

}


// ===============================================
// PRETRAGA
// ===============================================

function initSearch() {

    const input = document.getElementById("searchInput");

    if (!input) return;

    input.addEventListener("input", () => {

        const text = input.value.toLowerCase();

        if (typeof searchDrivers === "function") {

            searchDrivers(text);

        }

        if (typeof searchVehicles === "function") {

            searchVehicles(text);

        }

    });

}


// ===============================================
// ZATVARANJE MENIJA KLIKOM IZVAN
// ===============================================

document.addEventListener("click", (e) => {

    const sidebar = document.querySelector(".sidebar");

    const toggle = document.getElementById("menuToggle");

    if (!sidebar || !toggle) return;

    if (window.innerWidth > 768) return;

    if (
        !sidebar.contains(e.target) &&
        !toggle.contains(e.target)
    ) {

        sidebar.classList.remove("active");

    }

});


// ===============================================
// ESC ZATVARA MODALE
// ===============================================

document.addEventListener("keydown", (e) => {

    if (e.key !== "Escape") return;

    document
        .querySelectorAll(".modal")
        .forEach(modal => {

            modal.classList.remove("active");

            modal.style.display = "none";

        });

});


// ===============================================
// KLIK IZVAN MODALA
// ===============================================

document
    .querySelectorAll(".modal")
    .forEach(modal => {

        modal.addEventListener("click", (e) => {

            if (e.target === modal) {

                modal.classList.remove("active");

                modal.style.display = "none";

            }

        });

    });

