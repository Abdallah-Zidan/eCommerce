const db = createDB();
db.orders.each(order => {
  let dateTime = order.date.toLocaleString().split(",");
  createRow({
    id: order.id,
    date: dateTime[0],
    time: dateTime[1],
    total: order.total
  });
});

function createRow(order) {
  let tbody = document.querySelector("#data-table");
  let tr = document.createElement("tr");
  let template = document.querySelector("#template-row");
  let html = fillTemplate(template.innerHTML, order);
  tr.innerHTML = html;
  tr.setAttribute("id", order.id);
  tbody.appendChild(tr);
}
function deleteOrder(orderId) {
  db.orders
    .where("id")
    .equals(orderId)
    .delete()
    .then(e => {
      let tr = $(`#${orderId}`);
      tr.fadeOut(500, function() {
        $(this).remove();
      });
    });
}
