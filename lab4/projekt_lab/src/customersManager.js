import fs from "fs";
import { popProductById } from "./productManager.js";

const customersPath = "./customers.json";

// przykladowy wkladany client
const customer = {
  name: "Jan"
}

// przykladowy wyciagany klient
const customer2 = {
  id: 1,
  name: "Jan",
  boughtProducts: [],
  borrowedProducts: []
}

// Dodaj nowego klienta do pliku
function addNewCustomer(customer, callback) {
  // Odczytaj istniejących klientów z pliku
  fs.readFile(customersPath, 'utf8', (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    const customers = JSON.parse(data);
    // Wygeneruj nowy identyfikator (ID)
    const newId = customers.length > 0 ? customers[customers.length - 1].id + 1 : 1;
    // Dodaj nowego klienta z nadanym ID
    const newCustomer = { id: newId, boughtProducts: [], borrowedProducts: [] , ...customer };
    customers.push(newCustomer);
    // Zapisz zaktualizowaną listę klientów do pliku
    fs.writeFile('customers.json', JSON.stringify(customers), (err) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, newCustomer); // Przekaż nowego klienta jako wynik operacji
    });
  });
}


// Funkcja zwracająca listę produktów kupionych przez danego klienta
function getBoughtProductsByCustomerId(customerId, callback) {
  // Odczytaj istniejących klientów z pliku
  fs.readFile(customersPath, 'utf8', (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    const customers = JSON.parse(data);
    // Znajdź klienta o podanym identyfikatorze
    const customer = customers.find((c) => c.id === customerId);
    if (!customer) {
      callback(new Error('Klient o podanym identyfikatorze nie został znaleziony.'));
      return;
    }
    // Pobierz listę produktów kupionych przez klienta
    const boughtProducts = customer.boughtProducts || [];
    // Zwróć listę produktów
    callback(null, boughtProducts);
  });
}

function getBorrowedProductsByCustomerId(customerId, callback) {
  // Odczytaj istniejących klientów z pliku
  fs.readFile(customersPath, 'utf8', (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    const customers = JSON.parse(data);
    // Znajdź klienta o podanym identyfikatorze
    const customer = customers.find((c) => c.id === customerId);
    if (!customer) {
      callback(new Error('Klient o podanym identyfikatorze nie został znaleziony.'));
      return;
    }
    // Pobierz listę produktów kupionych przez klienta
    const borrowedProducts = customer.borrowedProducts || [];
    // Zwróć listę produktów
    callback(null, borrowedProducts);
  });

}

function sellProductToCustomer(customerId, productId, callback) {
  // Odczytaj istniejących klientów z pliku
  fs.readFile(customersPath, 'utf8', (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    const customers = JSON.parse(data);
    // Znajdź klienta o podanym identyfikatorze
    const customer = customers.find((c) => c.id === customerId);
    if (!customer) {
      callback(new Error('Klient o podanym identyfikatorze nie został znaleziony.'));
      return;
    }

    popProductById(productId, (err, product) => {
      if (err) {
        callback(err);
        return;
      }
      // Dodaj produkt do listy produktów kupionych przez klienta
      customer.boughtProducts.push(product);
      // Zapisz zaktualizowaną listę klientów do pliku
      fs.writeFile(customersPath, JSON.stringify(customers), (err) => {
        if (err) {
          callback(err);
          return;
        }
        callback(null, customer); // Przekaż zaktualizowanego klienta jako wynik operacji
      });
    });


  });
}

function borrowProductToCustomer(customerId, productId, callback) {
  // Odczytaj istniejących klientów z pliku
  fs.readFile(customersPath, 'utf8', (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    const customers = JSON.parse(data);
    // Znajdź klienta o podanym identyfikatorze
    const customer = customers.find((c) => c.id === customerId);
    if (!customer) {
      callback(new Error('Klient o podanym identyfikatorze nie został znaleziony.'));
      return;
    }

    popProductById(productId, (err, product) => {
      if (err) {
        callback(err);
        return;
      }
      // Dodaj produkt do listy produktów kupionych przez klienta
      customer.borrowedProducts.push(product);
      // Zapisz zaktualizowaną listę klientów do pliku
      fs.writeFile(customersPath, JSON.stringify(customers), (err) => {
        if (err) {
          callback(err);
          return;
        }
        callback(null, customer); // Przekaż zaktualizowanego klienta jako wynik operacji
      });
    });
});
}


export { addNewCustomer, getBoughtProductsByCustomerId , sellProductToCustomer , getBorrowedProductsByCustomerId , borrowProductToCustomer  };