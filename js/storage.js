const DB = {

    drivers: [],

    vehicles: [],

    earnings: [],

    expenses: [],

    activity: []

};

function initStorage(){

    DB.drivers = JSON.parse(localStorage.getItem("drivers")) || [];

    DB.vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];

    DB.earnings = JSON.parse(localStorage.getItem("earnings")) || [];

    DB.expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    DB.activity = JSON.parse(localStorage.getItem("activity")) || [];

}

function saveStorage(){

    localStorage.setItem("drivers",JSON.stringify(DB.drivers));

    localStorage.setItem("vehicles",JSON.stringify(DB.vehicles));

    localStorage.setItem("earnings",JSON.stringify(DB.earnings));

    localStorage.setItem("expenses",JSON.stringify(DB.expenses));

    localStorage.setItem("activity",JSON.stringify(DB.activity));

}