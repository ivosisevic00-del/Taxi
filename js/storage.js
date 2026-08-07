const DB = {

    drivers: [],

    vehicles: [],

    finance: [],

    activity: []

};

function initStorage(){

    DB.drivers = JSON.parse(localStorage.getItem("drivers")) || [];

    DB.vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];

    DB.finance = JSON.parse(localStorage.getItem("finance")) || [];

    DB.activity = JSON.parse(localStorage.getItem("activity")) || [];

}

function saveStorage(){

    localStorage.setItem("drivers", JSON.stringify(DB.drivers));

    localStorage.setItem("vehicles", JSON.stringify(DB.vehicles));

    localStorage.setItem("finance", JSON.stringify(DB.finance));

    localStorage.setItem("activity", JSON.stringify(DB.activity));

}