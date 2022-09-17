// creates the variable to hold the airplane database
let db;

// establishes a database connection to IndexDB called airplane
const request = indexedDB.open('airplane', 1)

console.log("runnung idb.js")


request.onupgradeneeded = function(event) {
    console.log("updating database")
    const db = event.target.result;
    db.createObjectStore('new_plane', { autoIncrement: true });
}


