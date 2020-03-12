const cards = document.querySelector("#cards");
const totalPrice = document.querySelector("#total-price-value");
const checkoutBtn = document.querySelector("#checkout-btn");
const db = createDB();

// get saved products from local storage
let cartProducts = getDataFromLocalStorage();

// fetch details of each product from api using product id
cartProducts.forEach(product => {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://afternoon-falls-30227.herokuapp.com/api/v1/products/${product.id}`
  );
  xhr.send();
  xhr.onloadend = function(e) {
    if (xhr.status === 200) {
      let data = JSON.parse(xhr.response);
      let productData = data.data;
      // check if the product is available
      if (productData.Status === "Available") {
        // create a product card using product html template
        createProductCard(productData, product.amount);
      }
      // calculate products total price
      calculateTotal();
      addEventListeners(product.id);
    } else {
      console.log("couldn't retrieve data");
    }
  };
});

function createProductCard(productData, amount) {
  if (amount >= productData.Quantity) {
    amount = productData.Quantity;
  }
  let data = {
    productPicture: productData.ProductPicUrl,
    productId: productData.ProductId,
    productPrice: productData.Price,
    productCurrencyCode: productData.CurrencyCode,
    productQuantity: productData.Quantity,
    productName: productData.Name,
    amount: amount
  };
  let attr = document.createAttribute("pid");
  let div = document.createElement("div");
  attr.value = productData.ProductId;
  div.setAttributeNode(attr);
  div.classList.add(...["col-sm-12", "col-md-6", "col-lg-4"]);
  let template = document.querySelector("#template-card");
  let html = fillTemplate(template.innerHTML, data);
  div.innerHTML = html;
  cards.appendChild(div);
}

function addEventListeners(pid) {
  let addBtn = document.querySelector(`.addBtn[pid=${pid}]`);
  let removeBtn = document.querySelector(`.removeBtn[pid=${pid}]`);
  let deleteBtn = document.querySelector(`.deleteBtn[pid=${pid}]`);
  addBtnListener(addBtn);
  removeBtnListener(removeBtn);
  deleteBtnListener(deleteBtn);
}

function addBtnListener(addBtn) {
  let btnPid = addBtn.getAttribute("pid");
  let input = $(`input[pid=${btnPid}]`);
  let qty = input.attr("qty");
  addBtn.addEventListener("click", e => {
    if (Number(input.val()) < Number(qty)) {
      input.val(Number(input.val()) + 1);
      incrementItem(btnPid);
      calculateTotal();
    }
  });
}

function removeBtnListener(removeBtn) {
  let btnPid = removeBtn.getAttribute("pid");
  let input = $(`input[pid=${btnPid}]`);
  removeBtn.addEventListener("click", e => {
    if (Number(input.val()) > 1) {
      input.val(Number(input.val()) - 1);
      decrementItem(btnPid);
      calculateTotal();
    }
  });
}

function deleteBtnListener(deleteBtn) {
  let btnPid = deleteBtn.getAttribute("pid");
  let div = $(`div[pid=${btnPid}]`);
  deleteBtn.addEventListener("click", e => {
    div.fadeOut(400, function() {
      $(this).remove();
      deleteItemFromLocalStorage(btnPid, getDataFromLocalStorage());
      calculateTotal();
    });
  });
}

function calculateTotal() {
  const itemsPrice = document.querySelectorAll(".item-price");
  let total = 0;
  itemsPrice.forEach(product => {
    let data = getProductData(product);
    total += data.price;
  });
  totalPrice.innerText = total;
  return total;
}
checkoutBtn.addEventListener("click", e => {
  let products = document.querySelectorAll(".item-price");
  let productsArr = [];
  products.forEach(product => {
    let data = getProductData(product);
    productsArr.push({
      name: data.name,
      amount: data.noOfItems,
      price: data.price
    });
  });
  let orderPrice = calculateTotal();
  let date = new Date();
  let order = { products: productsArr, date: date, total: orderPrice };
  insertData(db.orders, order);
  clearLocalStorage();
});

function getProductData(product) {
  let pid = product.getAttribute("pid");
  let noOfItems = $(`input[pid=${pid}]`).val();
  let price = Number(product.innerText) * noOfItems;
  let name = $(`.product-name[pid=${pid}]`).text();
  return {
    pid: pid,
    noOfItems: noOfItems,
    price: price,
    name: name
  };
}

addItemToLocalStorage("HT-1003", 15);
addItemToLocalStorage("HT-1001", 10);
addItemToLocalStorage("HT-1002", 15);
