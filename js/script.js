let firstPage = 1;
let lastPage = 13;
let currentPage = 1;

///////////////// fetch data from api
function getProducts(page){
    fetch('https://afternoon-falls-30227.herokuapp.com/api/v1/products/?page='+page)
    .then((res)=>res.json())
    .then((data)=>{
        let output=""
        data.data.forEach(product => {
            output +=`
            <div class="col-md-4">
            <div class="single-product-wrapper">
                <!-- Product Image -->
                <div class="product-img ">
                    <img class="img-fluid" src="${product.ProductPicUrl}" alt="" id="productImg">
                </div>

                <!-- Product Description -->
                <div class="product-description d-flex align-items-center justify-content-between">
                    <!-- Product Meta Data -->
                    <div class="product-meta-data">
                        <div class="line"></div>
                        <p class="product-price">${product.CurrencyCode} ${product.Price}</p>
                            <h6>${product.Name}</h6>
                        
                    </div>
                    <!-- Cart -->
                    <div class="ratings-cart text-right">
                        <div class="cart">
                            <a href="cart.html" data-toggle="tooltip" data-placement="left" title="Add to Cart"><img src="img/core-img/bag.png" alt=""></a>
                        </div>
                    </div>
                </div>
            </div>
            </div>`

                document.getElementById("postPlace").innerHTML =output;
            console.log("category: "+product.Category);
            // console.log(product.SupplierName);
            
            
        });

    })
    .catch((err)=>{
        console.log(err);
    });
}



function nextPage() {
    currentPage += 1;
    getProducts(currentPage);
}
function previousPage() {
    currentPage -= 1;
    getProducts(currentPage);
}


window.onload = function() {
    clearChecks();
    getProducts(1);
  };




///////////filter by category

function filterByCat(category){
    fetch('https://afternoon-falls-30227.herokuapp.com/api/v1/products/?category='+category)
    .then((res)=>res.json())
    .then((data)=>{
        let output=""
        data.data.forEach(product => {
            output +=`
            <div class="col-md-4">
            <div class="single-product-wrapper">
                <!-- Product Image -->
                <div class="product-img ">
                    <img class="img-fluid" src="${product.ProductPicUrl}" alt="" id="productImg">
                </div>

                <!-- Product Description -->
                <div class="product-description d-flex align-items-center justify-content-between">
                    <!-- Product Meta Data -->
                    <div class="product-meta-data">
                        <div class="line"></div>
                        <p class="product-price">${product.CurrencyCode} ${product.Price}</p>
                            <h6>${product.Name}</h6>
                        
                    </div>
                    <!-- Cart -->
                    <div class="ratings-cart text-right">
                        <div class="cart">
                            <a href="cart.html" data-toggle="tooltip" data-placement="left" title="Add to Cart"><img src="img/core-img/bag.png" alt=""></a>
                        </div>
                    </div>
                </div>
            </div>
            </div>`

                document.getElementById("postPlace").innerHTML =output;
        });
    })
    .catch((err)=>{
        console.log(err);
    });

    
}


$("input[type='checkbox']").change(function() {
    console.log("checked");
    if($(this).is (':checked')) {
        filterByCat($(this).attr("name"));
    }
});



/////////////////////////clear checks
function clearChecks(){
    if($("input[type='checkbox']").is (':checked'))
    { $(this).prop('checked', false);
        }
}
