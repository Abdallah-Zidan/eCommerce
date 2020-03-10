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

function deleteItemFromLocalStorage(pid, products) {
  if (products) {
    products = products.filter(function(product) {
      return product.id !== pid;
    });
    writeToLocalStorage(products);
  }
}
function addItemToLocalStorage(item, products) {
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
      console.log("similar");

      product.amount += 1;
      exists = true;
    }
  });
  return exists;
}
function writeToLocalStorage(products) {
  localStorage.setItem(ITEMS, JSON.stringify(products));
}
