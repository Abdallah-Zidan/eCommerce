


function getProducts(){
    fetch('https://afternoon-falls-30227.herokuapp.com/api/v1/products/')
    .then((res)=>res.json())
    .then((data)=>{
        let output=""
        data.data.forEach(product => {
            output +=`
            <div class="single-products-catagory clearfix">
                    <a href="shop.html">
                        <img src="${product.ProductPicUrl}" alt="" id>
                        
                        <div class="hover-content">
                            <div class="line"></div>
                            <p>${product.Price}/p>
                            <h4>${product.Name}</h4>
                        </div>
                    </a>
                </div>`;
        });
        document.getElementById('postPlace').innerHTML=
        output;

    })
    .catch((err)=>{
        console.log(err);
    });
}

getProducts();