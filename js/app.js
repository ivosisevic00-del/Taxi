// =======================================
// Zdravi Razum ERP
// app.js
// =======================================

document.addEventListener("DOMContentLoaded", () => {

    // Učitaj podatke
    initStorage();

    // Pokreni module
    if (typeof initDashboard === "function") initDashboard();
    if (typeof initDrivers === "function") initDrivers();
    if (typeof initVehicles === "function") initVehicles();
    if (typeof initFinance === "function") initFinance();

    // Pokreni aplikaciju
    initNavigation();
    initQuickActions();
    initSearch();
    initMobileMenu();
    initModalEvents();

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

            // Zatvori menu na mobitelu
            if (window.innerWidth <= 900) {

                const sidebar = document.querySelector(".sidebar");

                if (sidebar) {
                    sidebar.classList.remove("active");
                }

            }

        });

    });

    showModule("Dashboard");

}

// =======================================
// PRIKAZ MODULA
// =======================================

function showModule(page) {

    // Sakrij dashboard
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

        const module = document.getElementById(id);

        if (module) {
            module.style.display = "none";
        }

    });

    // Prikaži odabrani modul
    switch (page) {

        case "Dashboard":

            if (dashboard) {
                dashboard.style.display = "grid";
            }

            break;

        case "Vozači":

            document.getElementById("driversModule")?.style.setProperty("display", "block");

            break;

        case "Vozila":

            document.getElementById("vehiclesModule")?.style.setProperty("display", "block");

            break;

        case "Financije":

            document.getElementById("financeModule")?.style.setProperty("display", "block");

            break;

        case "Servisi":

            document.getElementById("serviceModule")?.style.setProperty("display", "block");

            break;

        case "Dokumenti":

            document.getElementById("documentsModule")?.style.setProperty("display", "block");

            break;

        default:

            if (dashboard) {
                dashboard.style.display = "grid";
            }

    }

}

// =======================================
// BRZE AKCIJE
// =======================================

function initQuickActions() {

    const quickDriver = document.getElementById("quickDriver");

    if (quickDriver) {
        quickDriver.onclick = () => openDriverModal();
    }

    const quickVehicle = document.getElementById("quickVehicle");

    if (quickVehicle) {
        quickVehicle.onclick = () => openVehicleModal();
    }

    const quickFinance = document.getElementById("quickFinance");

    if (quickFinance) {
        quickFinance.onclick = () => openFinanceModal();
    }

}

// =======================================
// PRETRAGA
// =======================================

function initSearch() {

    const input = document.getElementById("searchInput");

    if (!input) return;

    input.addEventListener("input", function () {

        const value = this.value.toLowerCase();

        if (typeof searchDrivers === "function") {
            searchDrivers(value);
        }

        if (typeof searchVehicles === "function") {
            searchVehicles(value);
        }

    });

}

// =======================================
// MOBILE MENU
// =======================================

function initMobileMenu() {

    const button = document.getElementById("menuToggle");

    const sidebar = document.querySelector(".sidebar");

    if (!button || !sidebar) return;

    button.addEventListener("click", () => {

sidebar.classList.toggle("active");

document.body.classList.toggle("menu-open");
    });

}

// =======================================
// MODALI
// =======================================

function openModal(id) {

    const modal = document.getElementById(id);

    if (modal) {
        modal.classList.add("active");
    }

}

function closeModal(id) {

    const modal = document.getElementById(id);

    if (modal) {
        modal.classList.remove("active");
    }

}

// =======================================
// MODAL DOGAĐAJI
// =======================================

function initModalEvents() {

    // Driver
    const closeDriver = document.getElementById("closeDriver");

    if (closeDriver) {
        closeDriver.onclick = () => closeModal("driverModal");
    }

    // Vehicle
    const closeVehicle = document.getElementById("closeVehicle");

    if (closeVehicle) {
        closeVehicle.onclick = () => closeModal("vehicleModal");
    }

    // Finance
    const closeFinance = document.getElementById("closeFinance");

    if (closeFinance) {
        closeFinance.onclick = () => closeModal("financeModal");
    }

    // Gumb "Novi zapis" u Financijama
    const newFinance = document.getElementById("newFinanceBtn");

    if (newFinance) {
        newFinance.onclick = () => openFinanceModal();
    }

    // Klik izvan modala zatvara modal
    document.querySelectorAll(".modal").forEach(modal => {

        modal.addEventListener("click", e => {

            if (e.target === modal) {

                modal.classList.remove("active");

            }

        });

    });

}

// =======================================
// ESC zatvara sve modale
// =======================================

document.addEventListener("keydown", e => {

    if (e.key !== "Escape") return;

    document.querySelectorAll(".modal").forEach(modal => {

        modal.classList.remove("active");

    });

});

