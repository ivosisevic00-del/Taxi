// =========================
// FleetCore ERP v1.0
// app.js
// =========================

const DB = {
    drivers: JSON.parse(localStorage.getItem("drivers")) || [],
    vehicles: JSON.parse(localStorage.getItem("vehicles")) || [],
    earnings: JSON.parse(localStorage.getItem("earnings")) || [],
    expenses: JSON.parse(localStorage.getItem("expenses")) || [],
    activity: JSON.parse(localStorage.getItem("activity")) || []
};

function saveDB() {
    localStorage.setItem("drivers", JSON.stringify(DB.drivers));
    localStorage.setItem("vehicles", JSON.stringify(DB.vehicles));
    localStorage.setItem("earnings", JSON.stringify(DB.earnings));
    localStorage.setItem("expenses", JSON.stringify(DB.expenses));
    localStorage.setItem("activity", JSON.stringify(DB.activity));
}

function updateDashboard() {

    const drivers = document.getElementById("driversCount");
    const vehicles = document.getElementById("vehiclesCount");

    if (drivers) {
        drivers.textContent = DB.drivers.length;
    }

    if (vehicles) {
        vehicles.textContent = DB.vehicles.length;
    }

    const income = DB.earnings.reduce((a, b) => a + Number(b.amount || 0), 0);
    const expense = DB.expenses.reduce((a, b) => a + Number(b.amount || 0), 0);

    const cards = document.querySelectorAll(".card h1");

    if (cards.length >= 4) {
        cards[2].textContent = income.toFixed(2) + " €";
        cards[3].textContent = expense.toFixed(2) + " €";
    }

}

function addActivity(text) {

    DB.activity.unshift({
        text,
        date: new Date().toLocaleString("hr-HR")
    });

    if (DB.activity.length > 20)
        DB.activity.pop();

    saveDB();

    renderActivity();

}

function renderActivity() {

    const list = document.getElementById("activity");

    if (!list) return;

    list.innerHTML = "";

    DB.activity.forEach(item => {

        const li = document.createElement("li");

        li.innerHTML =
            `<strong>${item.text}</strong><br>
             <small>${item.date}</small>`;

        list.appendChild(li);

    });

}

function addDriver(driver){

    DB.drivers.push(driver);

    saveDB();

    addActivity("Dodan novi vozač");

    updateDashboard();

}

function addVehicle(vehicle){

    DB.vehicles.push(vehicle);

    saveDB();

    addActivity("Dodano novo vozilo");

    updateDashboard();

}

document.addEventListener("DOMContentLoaded",()=>{

    updateDashboard();

    renderActivity();

    console.log("FleetCore ERP pokrenut.");

});

// ==========================
// DRIVER MODULE
// ==========================

const modal = document.getElementById("driverModal");
const openBtn = document.getElementById("newDriverBtn");
const closeBtn = document.getElementById("closeDriver");
const saveBtn = document.getElementById("saveDriver");

function renderDrivers() {

    const tbody = document.getElementById("driversBody");

    if (!tbody) return;

    tbody.innerHTML = "";

    DB.drivers.forEach((driver,index)=>{

        tbody.innerHTML += `

        <tr>

            <td>${driver.name}</td>

            <td>${driver.surname}</td>

            <td>${driver.phone}</td>

            <td>${driver.status}</td>

            <td>

                <button onclick="deleteDriver(${index})">

                    Obriši

                </button>

            </td>

        </tr>

        `;

    });

}

function deleteDriver(index){

    if(!confirm("Obrisati vozača?"))
        return;

    DB.drivers.splice(index,1);

    saveDB();

    renderDrivers();

    updateDashboard();

    addActivity("Obrisan vozač");

}

if(openBtn){

    openBtn.onclick=()=>{

        modal.style.display="flex";

    };

}

if(closeBtn){

    closeBtn.onclick=()=>{

        modal.style.display="none";

    };

}

if(saveBtn){

saveBtn.onclick=()=>{

    const driver={

        name:document.getElementById("driverName").value,

        surname:document.getElementById("driverSurname").value,

        phone:document.getElementById("driverPhone").value,

        status:document.getElementById("driverStatus").value

    };

    if(driver.name===""){

        alert("Upiši ime.");

        return;

    }

    addDriver(driver);

    renderDrivers();

    modal.style.display="none";

    document.getElementById("driverName").value="";
    document.getElementById("driverSurname").value="";
    document.getElementById("driverPhone").value="";

};

}

document.addEventListener("DOMContentLoaded",()=>{

    renderDrivers();

});