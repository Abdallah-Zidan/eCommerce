let firstPage = 1;
let lastPage = 13;
let currentPage = 1;

///////////////// fetch data from api
function getProducts(page) {
  fetch(
    "https://afternoon-falls-30227.herokuapp.com/api/v1/products/?page=" + page
  )
    .then(res => res.json())
    .then(data => {
      let output = "";
      data.data.forEach(product => {
        output += `
            <div class="col-md-4">
            <div class="single-product-wrapper">
                <!-- Product Image -->
                <div class="product-img" pid="${product.ProductId}" data-target="#exampleModalCenteredScrollable"
                data-toggle="modal" class="btn btn-show">
                    <img class="img-fluid" src="${product.ProductPicUrl}" alt="" id="productImg" onClick="getRequest('${product.ProductId}')">
                </div>

                <!-- Product Description -->
                <div class="product-description d-flex align-items-center justify-content-between">
                    <!-- Product Meta Data -->
                    <div class="product-meta-data">
                        <div class="line"></div>
                        <p class="product-price"> ${product.Price} <span style="font-size:17px;">${product.CurrencyCode}<span></p>
                            <h6>${product.Name}</h6>
                        
                    </div>
                    <!-- Cart -->
                    <div class="ratings-cart text-right">
                        <div class="cart">
                            <a style="cursor:pointer;"   onClick="addToCart('${product.ProductId}', ${product.Quantity})" data-toggle="tooltip" data-placement="left" title="Add to Cart"><img src="assets/images/bag.png" alt=""></a>
                        </div>
                    </div>
                </div>
            </div>
            </div>`;

        document.getElementById("postPlace").innerHTML = output;
        // console.log("category: "+product.Category);
        // console.log(product.SupplierName);
      });
    })
    .catch(err => {
      console.log(err);
    });
}

function getFirstPage() {
  currentPage = firstPage;
  getProducts(currentPage);
}

function getLastPage() {
  currentPage = lastPage;
  getProducts(currentPage);
}

function nextPage() {
  if (currentPage < lastPage) {
    currentPage += 1;
  } else {
    currentPage = firstPage;
  }
  getProducts(currentPage);
}

function previousPage() {
  if (currentPage > firstPage) {
    currentPage -= 1;
  } else {
    currentPage = lastPage;
  }
  getProducts(currentPage);
}

window.onload = function() {
  clearChecks();
  getProducts(firstPage);
};

///////////filter by category only

function filterByCat(category) {
  fetch(
    "https://afternoon-falls-30227.herokuapp.com/api/v1/products/?category=" +
      category
  )
    .then(res => res.json())
    .then(data => {
      let output = "";
      data.data.forEach(product => {
        output += `
            <div class="col-md-4">
            <div class="single-product-wrapper">
                <!-- Product Image -->
                <div class="product-img" pid="${product.ProductId}" data-target="#exampleModalCenteredScrollable"
                data-toggle="modal" class="btn btn-show">
                    <img class="img-fluid" src="${product.ProductPicUrl}" alt="" id="productImg" onClick="getRequest('${product.ProductId}')">
                </div>

                <!-- Product Description -->
                <div class="product-description d-flex align-items-center justify-content-between">
                    <!-- Product Meta Data -->
                    <div class="product-meta-data">
                        <div class="line"></div>
                        <p class="product-price"> ${product.Price} <span style="font-size:17px;">${product.CurrencyCode}<span></p>
                            <h6>${product.Name}</h6>
                        
                    </div>
                    <!-- Cart -->
                    <div class="ratings-cart text-right">
                        <div class="cart">
                            <a style="cursor:pointer;"    onClick="addItemToLocalStorage('${product.ProductId}', ${product.Quantity})"  data-toggle="tooltip" data-placement="left" title="Add to Cart"><img src="assets/images/bag.png" alt=""></a>
                        </div>
                    </div>
                </div>
            </div>
            </div>`;

        document.getElementById("postPlace").innerHTML = output;
      });
    })
    .catch(err => {
      console.log(err);
    });
}

$("input.cat").change(function() {
  if ($(this).is(":checked")) {
    filterByCat($(this).attr("name"));
  }
  clearChecks();
  $(this).prop("checked", true);
});

///////////////////////////////////filter by supplier
function filterBySup(sup) {
  fetch(
    "https://afternoon-falls-30227.herokuapp.com/api/v1/products/?supplier=" +
      sup
  )
    .then(res => res.json())
    .then(data => {
      let output = "";
      data.data.forEach(product => {
        output += `
            <div class="col-md-4">
            <div class="single-product-wrapper">
                <!-- Product Image -->
                <div class="product-img" pid="${product.ProductId}" data-target="#exampleModalCenteredScrollable"
                data-toggle="modal" class="btn btn-show">
                    <img class="img-fluid" src="${product.ProductPicUrl}" alt="" id="productImg" onClick="getRequest('${product.ProductId}')">
                </div>

                <!-- Product Description -->
                <div class="product-description d-flex align-items-center justify-content-between">
                    <!-- Product Meta Data -->
                    <div class="product-meta-data">
                        <div class="line"></div>
                        <p class="product-price"> ${product.Price} <span style="font-size:17px;">${product.CurrencyCode}<span></p>
                            <h6>${product.Name}</h6>
                        
                    </div>
                    <!-- Cart -->
                    <div class="ratings-cart text-right">
                        <div class="cart">
                            <a style="cursor:pointer;"    onClick="addItemToLocalStorage('${product.ProductId}', ${product.Quantity})"  data-toggle="tooltip" data-placement="left" title="Add to Cart"><img src="assets/images/bag.png" alt=""></a>
                        </div>
                    </div>
                </div>
            </div>
            </div>`;

        document.getElementById("postPlace").innerHTML = output;
      });
    })
    .catch(err => {
      console.log(err);
    });
}

$("input.sup").change(function() {
  if ($(this).is(":checked")) {
    filterBySup($(this).attr("name"));
  }
  clearChecks();
  $(this).prop("checked", true);
});

/////////////////////////clear checks
function clearChecks() {
  if ($("input[type='checkbox']").is(":checked")) {
    console.log("enterd if");
    $("input[type='checkbox']").prop("checked", false);
  }
}

//////////////////////////////////Search

$("#searchBtn").click(() => {
  Search();
});

function Search() {
  let text = $("#textSearch")[0].value;
  console.log(text);
  console.log(
    "https://afternoon-falls-30227.herokuapp.com/api/v1/products/?q=" + text
  );
  fetch(
    "https://afternoon-falls-30227.herokuapp.com/api/v1/products/?q=" + text
  )
    .then(res => res.json())
    .then(data => {
      let output = "";
      data.data.forEach(product => {
        output += `
            <div class="col-md-4">
            <div class="single-product-wrapper">
                <!-- Product Image -->
                <div class="product-img" pid="${product.ProductId}" data-target="#exampleModalCenteredScrollable"
                data-toggle="modal" class="btn btn-show">
                    <img class="img-fluid" src="${product.ProductPicUrl}" alt="" id="productImg" onClick="getRequest('${product.ProductId}')">
                </div>

                <!-- Product Description -->
                <div class="product-description d-flex align-items-center justify-content-between">
                    <!-- Product Meta Data -->
                    <div class="product-meta-data">
                        <div class="line"></div>
                        <p class="product-price"> ${product.Price} <span style="font-size:17px;">${product.CurrencyCode}<span></p>
                            <h6>${product.Name}</h6>
                        
                    </div>
                    <!-- Cart -->
                    <div class="ratings-cart text-right">
                        <div class="cart">
                            <a style="cursor:pointer;"  onClick="addItemToLocalStorage('${product.ProductId}', ${product.Quantity})"  data-toggle="tooltip" data-placement="left" title="Add to Cart"><img src="assets/images/bag.png" alt=""></a>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>`;

        document.getElementById("postPlace").innerHTML = output;
      });
      console.log($("#textSearch")[0]);
      $("#textSearch")[0].value = "";
    })
    .catch(err => {
      console.log(err);
    });
}


///////////////////add to cart

function addToCart(id,quantity){
  addItemToLocalStorage(id, quantity);

  document.getElementById("header-cart").innerHTML=`<img src="assets/images/bag.png" alt=""
  /><sub><span class="badge badge-pill badge-warning"> </span><sub>`;
}