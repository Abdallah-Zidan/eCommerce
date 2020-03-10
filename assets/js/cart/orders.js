const db = createDB();

db.orders.each(order => {
  createRow({
    id: order.id,
    date: order.date.toLocaleString(),
    total: order.total
  });
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
function createRow(order) {
  let tbody = document.querySelector("#data-table");
  let tr = document.createElement("tr");
  let template = document.querySelector("#template-row");
  let html = fillTemplate(template.innerHTML, order);
  tr.innerHTML = html;
  tbody.appendChild(tr);
}
