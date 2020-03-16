/*
this file contains useful functions to be used with database indexed db and local storage
*/

// database data
const DB_NAME = "ecommerce";
const TABLE_NAME = "orders";
const TABLE = { orders: `++id , products , date , total` };
const DB_VERSION = 1;

function createDB() {
  const db = new Dexie(DB_NAME);
  db.version(DB_VERSION).stores(TABLE);
  db.open();
  return db;
}
function insertData(dbTable, data) {
  dbTable.bulkAdd([data]);
}

// templates
function fillTemplate(templateHml, data) {
  Object.keys(data).forEach(function(key) {
    let placeHolder = "{{" + key + "}}";
    let val = data[key];
    while (templateHml.indexOf(placeHolder) !== -1) {
      templateHml = templateHml.replace(placeHolder, val);
    }
  });
  return templateHml;
}

// local storage

const ITEMS = "products";

function getDataFromLocalStorage() {
  let products = JSON.parse(localStorage.getItem(ITEMS));
  if (products) {
    return products;
  } else {
    return [];
  }
}

function clearLocalStorage() {
  localStorage.clear();
}

function deleteItemFromLocalStorage(pid) {
  let products = getDataFromLocalStorage();
  if (products) {
    products = products.filter(function(product) {
      return product.id !== pid;
    });
    writeToLocalStorage(products);
  }
}
/**
 * @param pid : product id example "HT-1000"
 * @param quantity : prodcut available quantity from  the api in order to prevent adding to cart
 * more than the available items
 */
function addItemToLocalStorage(e, pid, quantity) {
  e.preventDEfault();
  let products = getDataFromLocalStorage();
  let item = { id: pid, amount: 1, qty: quantity };
  if (products) {
    if (!itemExists(item, products)) {
      products.push(item);
    }
    writeToLocalStorage(products);
  } else {
    writeToLocalStorage([item]);
  }
}
function itemExists(item, products) {
  let exists = false;
  products.forEach(product => {
    if (item.id == product.id) {
      if (product.amount < product.qty) {
        product.amount += 1;
      }
      exists = true;
    }
  });
  return exists;
}
function incrementItem(itemID) {
  let products = getDataFromLocalStorage();
  products.forEach(product => {
    if (product.id === itemID) {
      if (product.amount < product.qty) {
        product.amount += 1;
        writeToLocalStorage(products);
      }
      return;
    }
  });
}
function decrementItem(itemID) {
  let products = getDataFromLocalStorage();
  products.forEach(product => {
    if (product.id === itemID) {
      if (product.amount > 1) {
        product.amount -= 1;
        writeToLocalStorage(products);
      }
      return;
    }
  });
}
function writeToLocalStorage(products) {
  localStorage.setItem(ITEMS, JSON.stringify(products));
}
