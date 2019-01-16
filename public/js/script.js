/*global $*/

$(document).ready(function(){
    showCategories();
    showProducts();
    $("#minusProdus").click(() => {
        let val = parseInt($('#cantitateProduse').val());
        if (val > 1) {
            $('#cantitateProduse').val(val - 1);
        }
    });
    
    $("#plusProdus").click(() => {
        let val = parseInt($('#cantitateProduse').val());
            $('#cantitateProduse').val(val + 1);
    });
    
    $("#btnAddToCard").click(() => {
        let cartItems = window.sessionStorage.getItem("cartItems");
        let cart = cartItems !== '' && cartItems !== null ? JSON.parse(cartItems) : [];
        let product = {
            name: $("#title").html(),
            id: parseInt($("#idProduct").html()),
            price: $("#pretProdus").html(),
            number: parseInt($('#cantitateProduse').val())
        };
        let alreadyExists = false;
        cart.forEach( c => {
            if(c.id == product.id){
                c.number += product.number;
                alreadyExists = true;
            }
        })
        
        if(!alreadyExists){
            cart.push(product);
        }
        
        window.sessionStorage.setItem("cartItems", JSON.stringify(cart));
        alert(`Ati adaugat in cosul de cumparaturi produsul ${product.name} de ${product.number} ori`);
    });
})

function showCategories() {
    $.get('/categories', function(){
        $.get( "/categories", function( data ) {
            var html = ''
            data.forEach(function(category) {
                html = html + '<li><button type="button" onClick="showProducts('+category.id+')" class="btn btn-primary">'+category.name+'</button></li>'
                
            })
            $('#categories').html(html)
        });
    })
}

//todo: implement showProducts method
function showProducts(categoryId) {
    if(categoryId) {
        var url = '/categories/'+ categoryId +'/products';
    } else {
        var url = '/products'   
    }
    $.get(url, function(data) {
        var html = '';
        data.forEach(
            function(product) {
                html = html + '<div class="product" productIndex="'+ product.id +'">'
                  +  '<dl class="row">'
                  +  '<dt class="col-sm-3"> Product name </dt>'
                  +  '<dd class="col-sm-9">'+product.name+'</dd>'
                  +  '<dt class="col-sm-3"> Product description </dt>'
                  +  '<dt class="col-sm-9">'+product.description+'</dt>'
                  +  '</dl>'
                + '</div>';

                html = html + '<h5>Product reviews</h5>' + '</br>';
                
                if(product.reviews) {
                    product.reviews.forEach(
                        function(reviewData) {
                            html = html + reviewData.name + ' ' + reviewData.content;
                            html = html + '<br>';
                        }
                    )
                }
            }
        )
        $('#content').html(html);
        $('.product').click((e) => {
            let productId = e.currentTarget.getAttribute('productIndex');
            $.get(`/products/${productId}`, function(product) {
                showProduct(product);
                $('#view_product').modal();
            });
        });
    })
}

function showProduct(product) {
    $('#title').html(product.name);
    $('#categorieProdus').html(product.category.name);
    $('#idProduct').html(product.id);
    $('#descriereProdus').html(`<b>Descriere: </b> ${product.description}`);
    $('#pretProdus').html(`${product.price} LEI`);
    $('#cantitateProduse').val(1);
}