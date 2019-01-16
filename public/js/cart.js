$(document).ready(function() {
    let cartString = window.sessionStorage.getItem("cartItems");
    let cart = cartString !== '' && cartString !== null ? JSON.parse(cartString) : [];
    let products = '';
    cart.forEach(product => {
       products+= displayProduct(product);
    });
    
    let sum = 0 ;
    cart.forEach( c=>{
        sum += parseInt(c.price.split(" ")[0]) * c.number;
    });
    
    products += '<h4>Price to pay: '+ sum +'</h4>';
    
    $("#produseDinCos").html(products);
});

function displayProduct(product) {
    return '<dl class="row">'
                  +  '<dt class="col-sm-3"> Product name </dt>'
                  +  '<dd class="col-sm-9">'+product.name+'</dd>'
                  +  '<dt class="col-sm-3"> Price </dt>'
                  +  '<dt class="col-sm-9">'+product.price+'</dt>'
                  +  '<dt class="col-sm-3"> Quantity </dt>'
                  +  '<dt class="col-sm-9">'+product.number+'</dt>'
                  +  '</dl>'
                  +  '</br>';
}