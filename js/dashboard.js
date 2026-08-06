function initDashboard() {
    updateDashboard();
}

function updateDashboard() {

    const drivers = document.getElementById("driversCount");
    const vehicles = document.getElementById("vehiclesCount");

    if (drivers)
        drivers.textContent = DB.drivers.length;

    if (vehicles)
        vehicles.textContent = DB.vehicles.length;

    const income = DB.earnings.reduce((t, e) => t + Number(e.amount || 0), 0);
    const expenses = DB.expenses.reduce((t, e) => t + Number(e.amount || 0), 0);

    const cards = document.querySelectorAll(".card h1");

    if (cards.length >= 4) {
        cards[2].textContent = income.toFixed(2) + " €";
        cards[3].textContent = expenses.toFixed(2) + " €";
    }

}