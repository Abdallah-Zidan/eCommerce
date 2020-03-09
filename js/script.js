
/////////////////////pagination
let list = new Array();
let pageList = new Array();
let currentPage = 1;
let numberPerPage = 4;
let numberOfPages = 3;   // calculates the total number of pages


///////////////// fetch data from api
function getProducts(){
    fetch('https://afternoon-falls-30227.herokuapp.com/api/v1/products/')
    .then((res)=>res.json())
    .then((data)=>{
        
        data.data.forEach(product => {
            list.push(product);

            // output +=`
            // <div class="single-products-catagory clearfix col-md-4">
            //         <a href="shop.html">
            //             <img src="${product.ProductPicUrl}" alt="" id>
                        
            //             <div class="hover-content">
            //                 <div class="line"></div>
            //                 <p>${product.Price}</p>
            //                 <h4>${product.Name}</h4>
            //             </div>
            //         </a>
            //     </div>`;
        });
        // console.log(list);

        // return output;

    })
    .catch((err)=>{
        console.log(err);
    });
}






// function makeList() {
//     for (x = 0; x < 200; x++)
//         list.push(getProducts());
// }

function getNumberOfPages() {
    return Math.ceil(list.length / numberPerPage);
}
function nextPage() {
    currentPage += 1;
    loadList();
}
function previousPage() {
    currentPage -= 1;
    loadList();
}
function firstPage() {
    currentPage = 1;
    loadList();
}
function lastPage() {
    currentPage = numberOfPages;
    loadList();
}

function loadList() {
    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;

    pageList = list.slice(begin, end);
    drawList();    // draws out our data
    check();         // determines the states of the pagination buttons
}

function drawList() {
    document.getElementById("postPlace").innerHTML = "";
    let output=""
    for (r = 0; r < pageList.length; r++) {
        
        output +=`
            <div class="single-products-catagory clearfix col-md-4">
                    <a href="shop.html">
                        <img src="${pageList[r].ProductPicUrl}" alt="" id>
                        
                        <div class="hover-content">
                            <div class="line"></div>
                            <p>${pageList[r].Price}</p>
                            <h4>${pageList[r].Name}</h4>
                        </div>
                    </a>
                </div>`;
                document.getElementById("postPlace").innerHTML =output;
        }
        
    
}

function check() {
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
    document.getElementById("first").disabled = currentPage == 1 ? true : false;
    document.getElementById("last").disabled = currentPage == numberOfPages ? true : false;
}

function load() {
    // makeList();
    getProducts()
    loadList();
    // console.log(list);
}
    
window.onload = load;