const template = document.querySelector("#template-details");
const div = document.querySelector("#details");
const url = window.location.href.split("=");
const id = Number(url[1]);
const db = createDB();

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

function createDetails(details) {
  order = {
    id: details.id,
    date: details.date.toLocaleString(),
    total: details.total
  };
  let html = fillTemplate(template.innerHTML, order);
  let products = details.products;
  products.forEach(product => {
    html += `<h5>product : ${product.name}</h5>
            <h5>amount : ${product.amount}</h5>
            <h5>price per item: ${product.price}</h5>`;
  });

  div.innerHTML = html;
}

async function getDetails() {
  const details = await db.orders
    .where("id")
    .equals(id)
    .first();
  createDetails(details);
}
getDetails();
