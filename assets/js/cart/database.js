const DB_NAME = "ecommerce";
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
// function getData(dbTable, customArrangeFunction) {
//   let dataObj = [];
//   dbTable.count(count => {
//     if (count) {
//       dbTable.each(table => {
//         let obj = customArrangeFunction(table);
//         dataObj.push(obj);
//       });
//     } else {
//       return -1;
//     }
//   });
//   return dataObj;
// }

// function arrangeData(dbTable) {
//   let obj = {
//     id: dbTable.id,
//     products: dbTable.products,
//     date: dbTable.date,
//     total: dbTable.total
//   };
//   return obj;
// }
