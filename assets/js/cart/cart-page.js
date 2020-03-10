const cards = document.querySelector("#cards");
const totalPrice = document.querySelector("#total-price-value");
const checkoutBtn = document.querySelector("#checkout-btn");
const db = createDB();

// 2- query details of each product

let cartProducts = getDataFromLocalStorage();
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
      console.log(productData);
      if (productData.Status === "Available") {
        createProductCard(productData, product.amount);
      }
      calculateTotal();
      addEventListeners();
    } else {
      console.log("couldn't retrieve data");
    }
  };
});

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

function createProductCard(productData, amount) {
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
  div.classList.add(...["col", "s12", "m6", "l4", "xl3"]);
  let template = document.querySelector("#template-card");
  let html = fillTemplate(template.innerHTML, data);
  div.innerHTML = html;
  cards.appendChild(div);
}

function addEventListeners() {
  let addBtns = document.querySelectorAll(".addBtn");
  let removeBtns = document.querySelectorAll(".removeBtn");
  let deleteBtns = document.querySelectorAll(".deleteBtn");
  addBtnsListeners(addBtns);
  removeBtnsListeners(removeBtns);
  deleteBtnsListeners(deleteBtns);
}

function addBtnsListeners(addBtns) {
  for (const btn of addBtns) {
    let btnPid = btn.getAttribute("pid");
    let input = $(`input[pid=${btnPid}]`);
    let qty = input.attr("qty");
    btn.addEventListener("click", e => {
      if (Number(input.val()) < Number(qty)) {
        input.val(Number(input.val()) + 1);
        calculateTotal();
      }
    });
  }
}

function removeBtnsListeners(addBtns) {
  for (const btn of addBtns) {
    let btnPid = btn.getAttribute("pid");
    let input = $(`input[pid=${btnPid}]`);
    btn.addEventListener("click", e => {
      if (Number(input.val()) > 1) {
        input.val(Number(input.val()) - 1);
        calculateTotal();
      }
    });
  }
}

function deleteBtnsListeners(deleteBtns) {
  for (const btn of deleteBtns) {
    let btnPid = btn.getAttribute("pid");
    let div = $(`div[pid=${btnPid}]`);
    btn.addEventListener("click", e => {
      div.fadeOut(400, function() {
        $(this).remove();
        deleteItemFromLocalStorage(btnPid, getDataFromLocalStorage());
        calculateTotal();
      });
    });
  }
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
let products = getDataFromLocalStorage();
addItemToLocalStorage({ id: "HT-1001", amount: 4 }, products);
addItemToLocalStorage({ id: "HT-1002", amount: 2 }, products);
