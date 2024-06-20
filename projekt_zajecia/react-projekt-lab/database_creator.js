const indexedDB = window.indexedDB;

const dbRequest = indexedDB.open("MyDatabase", 1);


dbRequest.onerror = function (event) {
  console.error("Error while opening database:", event.target.errorCode);
};

dbRequest.onupgradeneeded = function (event) {
  const db = event.target.result;
  const vehicleStore = db.createObjectStore("Vehicles", { keyPath: "id", autoIncrement: true });
  vehicleStore.createIndex( "vehicle", ["name", "description", "price"],  { unique: false });

  const customerStore = db.createObjectStore("Customers", { keyPath: "id", autoIncrement: true });
  customerStore.createIndex("user", ["name", "surname", "email","bought_cars"], { unique: false });
};

dbRequest.onsuccess = function (event) {
  const db = event.target.result;
  console.log("Database has been opened successfully");
  db.close();
};
