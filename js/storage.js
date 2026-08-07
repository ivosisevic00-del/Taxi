// ===============================================
// storage.js
// SUPABASE
// ===============================================

const DB = {
    drivers: [],
    vehicles: [],
    finance: [],
    services: [],
    activity: []
};

async function initStorage() {

    await loadDrivers();

    await loadVehicles();

    await loadFinance();

}

async function loadDrivers() {

    const { data, error } = await supabase
        .from("drivers")
        .select("*");

    if (error) {

        console.error(error);

        return;

    }

    DB.drivers = data;

}

async function loadVehicles() {

    const { data, error } = await supabase
        .from("vehicles")
        .select("*");

    if (error) {

        console.error(error);

        return;

    }

    DB.vehicles = data;

}

async function loadFinance() {

    const { data, error } = await supabase
        .from("finances")
        .select("*");

    if (error) {

        console.error(error);

        return;

    }

    DB.finance = data;

}

async function saveStorage() {

    // više nije potreban
}

