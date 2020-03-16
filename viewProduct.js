const req = new XMLHttpRequest();
let btns = document.querySelectorAll("#product-img");

let img_div = document.querySelector("#prod_img");
let prod_name = document.querySelector(".prod_name");
let prod_mainCat = document.querySelector("#prod_mainCat");
let prod_Cat = document.querySelector("#prod_Cat");
let prod_price = document.querySelector("#prod_price");
let prod_status = document.querySelector("#prod_status");
let prod_desc = document.querySelector("#prod_desc");

btns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        let target = e.target;
        let pid = target.getAttribute("pid");
        console.log(pid);
        getRequest(pid);
    })
})
function getRequest(id) {
    req.open("GET", `https://afternoon-falls-30227.herokuapp.com/api/v1/products/${id}`);
    req.send();

    req.onloadend = () => {
        if (req.status === 200) {
            let data = JSON.parse(req.response).data;
            console.log(data);

            prod_img.src = data.ProductPicUrl;
            prod_name.innerText = data.Name;
            prod_img.alt = data.Name;

            prod_mainCat.innerText = "Main Category: " + data.MainCategory;
            prod_Cat.innerHTML = "Category: " + data.Category;
            prod_price.innerText = "Price: " + data.Price;
            prod_status.innerText = "Status: " + data.Status;
            prod_desc.innerText = "Description: " + data.Description;
        }
        else {
            console.log("couldn't resolve ")
        }

    };

}

