import fs from "fs";

const products_path = './products.json'

// Przykładowy produkt
const newProduct = {
  name: 'Nowy produkt',
  price: 99.99,
  description: 'To jest nowy produkt dodany do pliku.'
};

function getAllProducts(callback) {
  fs.readFile(products_path, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    const products = JSON.parse(data);
    callback(null, products);
  });
}

// Dodaj nowy produkt do pliku
function addNewProduct(product, callback) {
  // Odczytaj istniejące produkty z pliku
  fs.readFile(products_path, 'utf8', (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    const products = JSON.parse(data);
    // Wygeneruj nowy identyfikator (ID)
    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    // Dodaj nowy produkt z nadanym ID
    const newProduct = { id: newId, ...product };
    products.push(newProduct);
    // Zapisz zaktualizowaną listę produktów do pliku
    fs.writeFile('products.json', JSON.stringify(products), (err) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, newProduct); // Przekaż nowy produkt jako wynik operacji
    });
  });
}

// Usuń produkt z pliku na podstawie jego ID i go zwroc
function popProductById(productId, callback) {
  // Odczytaj istniejące produkty z pliku
  fs.readFile(products_path, 'utf8', (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    const products = JSON.parse(data);
    // Znajdź indeks produktu o wskazanym ID
    const index = products.findIndex(product => product.id === productId);
    if (index === -1) {
      callback(new Error('Produkt o wskazanym ID nie został znaleziony.'));
      return;
    }
    // Usuń produkt z listy i zapisz go do zmiennej
    const removedProduct = products.splice(index, 1)[0];
    // Zapisz zaktualizowaną listę produktów do pliku
    fs.writeFile(products_path, JSON.stringify(products), (err) => {
      if (err) {
        callback(err);
        return;
      }
      // Zwróć usunięty produkt jako wynik operacji
      callback(null, removedProduct);
    });
  });
}

export { getAllProducts, addNewProduct, popProductById };
