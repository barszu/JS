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

function addVehicle(vehicle) {
  const db_openRequest = indexedDB.open("MyDatabase", 1);
  db_openRequest.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction(["Vehicles"], "readwrite");
    const store = transaction.objectStore("Vehicles");
    const db_add_request = store.add(vehicle);

    db_add_request.onsuccess = function(event) {
      console.log("Vehicle has been added to the database");
    };

    db_add_request.onerror = function(event) {
      console.error("Error while adding vehicle:", event.target.errorCode);
    };

    transaction.oncomplete = function() {
      db.close();
    }
  }
  db_openRequest.onerror = function(event) {
    console.error("Error while opening database:", event.target.errorCode);
  }

}

function getAllVehicles() {
  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open("MyDatabase", 1);
    dbRequest.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction(["Vehicles"], "readonly");
      const store = transaction.objectStore("Vehicles");

      const getAllRequest = store.getAll();
      getAllRequest.onsuccess = function(event) {
        // console.log('All vehicles: ', event.target.result);
        resolve(event.target.result); // Rozwiązanie obietnicy z wynikiem pobrania danych
      };

      getAllRequest.onerror = function(event) {
        console.error('Error while getting all vehicles: ', event.target.error);
        reject(event.target.error); // Odrzucenie obietnicy w przypadku błędu
      };

      transaction.oncomplete = function() {
        db.close();
      };
    };

    dbRequest.onerror = function(event) {
      console.error("Error while opening database:", event.target.errorCode);
      reject(event.target.errorCode); // Odrzucenie obietnicy w przypadku błędu
    };
  });
}

function addCustomer(customer) {
  const db_openRequest = indexedDB.open("MyDatabase", 1);
  db_openRequest.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction(["Customers"], "readwrite");
    const store = transaction.objectStore("Customers");
    const db_add_request = store.add({...customer, bought_cars: []});

    db_add_request.onsuccess = function(event) {
      console.log("Customer has been added to the database");
    };

    db_add_request.onerror = function(event) {
      console.error("Error while adding customer:", event.target.errorCode);
    };

    transaction.oncomplete = function() {
      db.close();
    };
  };
  db_openRequest.onerror = function(event) {
    console.error("Error while opening database:", event.target.errorCode);
  };
}

async function getAllCustomers() {
  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open("MyDatabase", 1);
    dbRequest.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction(["Customers"], "readonly");
      const store = transaction.objectStore("Customers");

      const getAllRequest = store.getAll();
      getAllRequest.onsuccess = function(event) {
        // console.log('All customers: ', event.target.result);
        resolve(event.target.result); // Rozwiązanie obietnicy z wynikiem pobrania danych
      };

      getAllRequest.onerror = function(event) {
        console.error('Error while getting all customers: ', event.target.error);
        reject(event.target.error); // Odrzucenie obietnicy w przypadku błędu
      };

      transaction.oncomplete = function() {
        db.close();
      };
    };

    dbRequest.onerror = function(event) {
      console.error("Error while opening database:", event.target.errorCode);
      reject(event.target.errorCode); // Odrzucenie obietnicy w przypadku błędu
    };
  });
}

function sellVehicle(clientId , vehicleId) {
  const db_openRequest = indexedDB.open("MyDatabase", 1);
  db_openRequest.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction(["Customers", "Vehicles"], "readwrite");
    const customerStore = transaction.objectStore("Customers");
    const vehicleStore = transaction.objectStore("Vehicles");


    const vehicleRequest = vehicleStore.get(vehicleId);

    vehicleRequest.onsuccess = function(event) {
      const vehicle = event.target.result;
      // console.log('Vehicle: ', vehicle);
      if (vehicle === undefined) {
        console.error('No such vehicle exist, might be bought already?: ');
        return;
      }

      const customerRequest = customerStore.get(clientId);
      customerRequest.onsuccess = function(event) {
        const customer = event.target.result;
        // console.log('Customer: ', customer);

        if (customer === undefined) {
          console.error('No such customer exist: ');
          return;
        }

        customer.bought_cars.push(vehicle);
        customerStore.put(customer);
        console.log('Vehicle has been sold to the customer: ');
        vehicleStore.delete(vehicleId);
      };
    };
    transaction.oncomplete = function() {
      db.close();
    };
  };
  db_openRequest.onerror = function(event) {
    console.error("Error while opening database:", event.target.errorCode);
  };
}

export { addVehicle, getAllVehicles, addCustomer, getAllCustomers, sellVehicle };
