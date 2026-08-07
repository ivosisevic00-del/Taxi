// =======================================
// Zdravi Razum ERP
// app.js
// =======================================

document.addEventListener("DOMContentLoaded", () => {

    initStorage();

    if (typeof initDashboard === "function")
        initDashboard();

    if (typeof initDrivers === "function")
        initDrivers();

    if (typeof initVehicles === "function")
        initVehicles();

    if (typeof initFinance === "function")
        initFinance();

    initNavigation();

    initQuickActions();

    initSearch();

    initModalButtons();

});

// =======================================
// NAVIGACIJA
// =======================================

function initNavigation() {

    const buttons = document.querySelectorAll(".menu-item");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(b => b.classList.remove("active"));

            button.classList.add("active");

            const page = button.textContent.trim();

            showModule(page);

        });

    });

    showModule("Dashboard");

}

// =======================================
// PRIKAZ MODULA
// =======================================

function showModule(page) {

    // Sakrij Dashboard
    const dashboard = document.querySelector(".dashboard");

    if (dashboard) {
        dashboard.style.display = "none";
    }

    // Sakrij sve module
    const modules = [
        "driversModule",
        "vehiclesModule",
        "financeModule",
        "serviceModule",
        "documentsModule"
    ];

    modules.forEach(id => {

        const el = document.getElementById(id);

        if (el) {
            el.style.display = "none";
        }

    });

    // Prikaži odabrani modul
    switch (page) {

        case "Dashboard":

            if (dashboard) {
                dashboard.style.display = "grid";
            }

            break;

        case "Vozači": {

            const el = document.getElementById("driversModule");

            if (el) {
                el.style.display = "block";
            }

            break;
        }

        case "Vozila": {

            const el = document.getElementById("vehiclesModule");

            if (el) {
                el.style.display = "block";
            }

            break;
        }

        case "Financije": {

            const el = document.getElementById("financeModule");

            if (el) {
                el.style.display = "block";
            }

            break;
        }

        case "Servisi": {

            const el = document.getElementById("serviceModule");

            if (el) {
                el.style.display = "block";
            }

            break;
        }

        case "Dokumenti": {

            const el = document.getElementById("documentsModule");

            if (el) {
                el.style.display = "block";
            }

            break;
        }

    }

}

