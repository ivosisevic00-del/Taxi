// ===============================================
// ZDRAVI RAZUM ERP
// storage.js
// ===============================================

const DB = {

    drivers: [],
    vehicles: [],
    finance: [],
    services: [],
    activity: []

};

// ===============================================
// INICIJALIZACIJA
// ===============================================

async function initStorage() {

    await Promise.all([

        loadDrivers(),

        loadVehicles(),

        loadFinance()

    ]);

}

// ===============================================
// VOZAČI
// ===============================================

async function loadDrivers() {

    const { data, error } = await db
        .from("drivers")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {

        console.error("Drivers:", error);

        DB.drivers = [];

        return;

    }

    DB.drivers = data || [];

}

// ===============================================
// VOZILA
// ===============================================

async function loadVehicles() {

    const { data, error } = await db
        .from("vehicles")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {

        console.error("Vehicles:", error);

        DB.vehicles = [];

        return;

    }

    DB.vehicles = data || [];

}

// ===============================================
// FINANCIJE
// ===============================================

async function loadFinance() {

    const { data, error } = await db
        .from("finances")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {

        console.error("Finance:", error);

        DB.finance = [];

        return;

    }

    DB.finance = data || [];

}

// ===============================================
// REFRESH
// ===============================================

async function refreshData() {

    await initStorage();

    if (typeof renderDrivers === "function")
        renderDrivers();

    if (typeof renderVehicles === "function")
        renderVehicles();

    if (typeof renderFinance === "function")
        renderFinance();

    if (typeof updateDashboard === "function")
        updateDashboard();

}

// ===============================================
// OSTAVLJENO RADI KOMPATIBILNOSTI
// ===============================================

async function saveStorage() {

    // više nije potreban

}