// =======================================
// FleetCore ERP
// dashboard.js
// =======================================

function initDashboard() {

    updateDashboard();

}

// =======================================
// DASHBOARD
// =======================================

function updateDashboard() {

    updateDriverCount();

    updateVehicleCount();

    updateFinance();

}

// =======================================
// VOZAČI
// =======================================

function updateDriverCount() {

    const el = document.getElementById("driversCount");

    if (!el) return;

    el.textContent = DB.drivers.length;

}

// =======================================
// VOZILA
// =======================================

function updateVehicleCount() {

    const el = document.getElementById("vehiclesCount");

    if (!el) return;

    el.textContent = DB.vehicles.length;

}

// =======================================
// FINANCIJE
// =======================================

function updateFinance() {

    let income = 0;

    let expense = 0;

    if (DB.finance) {

        DB.finance.forEach(item => {

            income += Number(item.income || 0);

            expense += Number(item.expense || 0);

        });

    }

    const profit = income - expense;

    setMoney("incomeTotal", income);

    setMoney("expenseTotal", expense);

    setMoney("financeIncome", income);

    setMoney("financeExpense", expense);

    setMoney("financeProfit", profit);

}

// =======================================
// FORMAT NOVCA
// =======================================

function setMoney(id, value) {

    const el = document.getElementById(id);

    if (!el) return;

    el.textContent =
        value.toLocaleString("hr-HR") + " €";

}

// =======================================
// AKTIVNOSTI
// =======================================

function addActivity(text) {

const list = document.getElementById("activityList");

    if (!list) return;

    const li = document.createElement("li");

    const now = new Date();

    li.textContent =
        now.toLocaleTimeString("hr-HR") +
        " • " +
        text;

    list.prepend(li);

    while (list.children.length > 10) {

        list.removeChild(list.lastChild);

    }

}