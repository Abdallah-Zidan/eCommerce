const cards = document.querySelector("#cards");
const totalPrice = document.querySelector(".total-price");
const checkoutBtn = document.querySelector("#checkout-btn");

// 1- read from local storage
// 2- query details of each product
// 3- create product card
// 4- count items and multiply with prices
// 5- calaculate total on every change
// 6- when checkout save into indexedDB

const xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  "https://afternoon-falls-30227.herokuapp.com/api/v1/products/?page=2"
);
xhr.send();
xhr.onloadend = function(e) {
  if (xhr.status === 200) {
    let data = JSON.parse(xhr.response);
    let products = data.data;
    for (const product of products) {
      if (product.Status === "Available") {
        createProductCard(product);
      }
    }
    addEventListeners();
  } else {
    console.log("couldn't retrieve data");
  }
};

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

function createProductCard(productData) {
  let templateHml = {
    productPicture: productData.ProductPicUrl,
    productId: productData.ProductId,
    productPrice: productData.Price,
    productCurrencyCode: productData.CurrencyCode,
    productQuantity: productData.Quantity
  };
  let attr = document.createAttribute("pid");
  let div = document.createElement("div");
  attr.value = productData.ProductId;
  div.setAttributeNode(attr);
  div.classList.add("col");
  div.classList.add("s12");
  div.classList.add("m6");
  div.classList.add("l3");
  let template = document.querySelector("#template-card");
  let templateHtml = template.innerHTML;
  let html = fillTemplate(templateHtml, templateHml);
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
      }
    });
  }
}

function deleteBtnsListeners(deleteBtns) {
  for (const btn of deleteBtns) {
    let btnPid = btn.getAttribute("pid");
    let div = $(`div[pid=${btnPid}]`);
    btn.addEventListener("click", e => {
      div.remove();
    });
  }
}
