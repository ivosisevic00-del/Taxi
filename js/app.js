// ===============================================
// ZDRAVI RAZUM ERP v2
// app.js
// ===============================================

document.addEventListener("DOMContentLoaded", initApp);

async function initApp() {

    console.log("Pokrećem ERP...");

    // učitaj podatke iz Supabase
    await initStorage();

    // inicijalizacija modula
    if (typeof initDashboard === "function") initDashboard();

    if (typeof initDrivers === "function") initDrivers();

    if (typeof initVehicles === "function") initVehicles();

    if (typeof initFinance === "function") initFinance();

    // UI
    initNavigation();

    initQuickActions();

    initSearch();

    initMobileMenu();

}



// ===============================================
// NAVIGACIJA
// ===============================================

function initNavigation() {

    const buttons = document.querySelectorAll(".menu-item");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            const page = button.dataset.page;

            showPage(page);

        });

    });

    showPage("dashboard");

}



function showPage(page) {

    document.querySelectorAll(".page").forEach(page => {

        page.style.display = "none";

    });

    const module = document.getElementById(page + "Module");

    if (module) {

        module.style.display = "block";

    }

    if (window.innerWidth <= 768) {

        document
            .querySelector(".sidebar")
            ?.classList.remove("active");

    }

}

// ===============================================
// MOBILE MENU
// ===============================================

function initMobileMenu() {

    const menuButton = document.getElementById("menuToggle");
    const sidebar = document.querySelector(".sidebar");

    if (!menuButton || !sidebar) return;

    menuButton.addEventListener("click", (e) => {

        e.stopPropagation();

        sidebar.classList.toggle("active");

    });

    document.addEventListener("click", (e) => {

        if (window.innerWidth > 768) return;

        if (
            !sidebar.contains(e.target) &&
            !menuButton.contains(e.target)
        ) {

            sidebar.classList.remove("active");

        }

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

        const value = input.value.toLowerCase();

        if (typeof searchDrivers === "function") {

            searchDrivers(value);

        }

        if (typeof searchVehicles === "function") {

            searchVehicles(value);

        }

    });

}

// ===============================================
// MODALI
// ===============================================

function closeAllModals() {

    document.querySelectorAll(".modal").forEach(modal => {

        modal.classList.remove("active");

        modal.style.display = "none";

    });

}



// ===============================================
// ESC ZATVARA MODALE
// ===============================================

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        closeAllModals();

    }

});



// ===============================================
// KLIK IZVAN MODALA
// ===============================================

document.addEventListener("click", (e) => {

    if (!e.target.classList.contains("modal")) return;

    closeAllModals();

});



// ===============================================
// RESIZE
// ===============================================

window.addEventListener("resize", () => {

    if (window.innerWidth > 768) {

        document
            .querySelector(".sidebar")
            ?.classList.remove("active");

    }

});



// ===============================================
// DASHBOARD
// ===============================================

function refreshApp() {

    if (typeof renderDrivers === "function") {

        renderDrivers();

    }

    if (typeof renderVehicles === "function") {

        renderVehicles();

    }

    if (typeof renderFinance === "function") {

        renderFinance();

    }

    if (typeof updateDashboard === "function") {

        updateDashboard();

    }

}



// ===============================================
// DEBUG
// ===============================================

console.log("✅ app.js učitan");

