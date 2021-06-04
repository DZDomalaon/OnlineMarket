$(document).ready(function(){    
    load_product();    
});

var id = $('#product_id').val();

function load_product() {

    var base_url = window.location.origin;        
    $.ajax({
        type:"GET",
        url: base_url + '/products/api/getproduct/',
        data: {'product': id},
        success: function(data){                                              
            var demo = "";                                
                        
            if(data['seller_id'] != $('#auth_user').val()){
                demo += "<div class='left-column'>"+
                        "<img src='" + data['product_image'] + "'>" +                         
                    "</div>"+
                                
                    "<div class='right-column'>"+
                        "<div id='error' class='alert alert-danger' role='alert' style='display: none'>"+
            
                        "</div>"+
                        "<div id='success' class='alert alert-success' role='alert' style='display: none'>"+
            
                        "</div>"+
                        "<div class='product-description'>"+
                            "<span>" + data.product_category + "</span>"+
                            "<h1 id='prod'>" + data['product_name'] + "</h1>"+
                            "<p id='desc'> " + data['description'] + " </p>"+
                        "</div>"+
                                                
                        "<div class='product-quantity'>"+                                               
                            "<div class='row'>"+
                                "<div class='col'>"+
                                    "<div class='product-shipping'>"+
                                        "<span>Original Price</span>"+
                                        "<p>" + data['price'] + "</p>"+
                                        "<input id='price' type='hidden' value='" +  data['price'] + "'>"+
                                    "</div>"+
                                "</div>"+
                                "<div class='col'>"+
                                    "<div class='product-discount'>"+
                                        "<span>Discount</span>"+
                                        "<p>" + data['discount'] + "</p>"+
                                        "<input id='product_discount' type='hidden' value='" +  data['discount'] + "'>"+
                                    "</div>"+
                                "</div>"+
                                "<div class='col'>"+
                                    "<div class='product-shipping'>"+
                                        "<span>Shipping Fee</span>"+
                                        "<p>" + data['shipping_fee'] + "</p>"+
                                        "<input id='product_shipping' type='hidden' value='" +  data['shipping_fee'] + "'>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"+
                            "<div class='product-shipping'>"+
                                "<span>Available</span>"+
                                "<p>" + data['quantity'] + "</p>"+
                                "<input id='product_shipping' type='hidden' value='" +  data['quantity'] + "'>"+
                            "</div>"+
                            "<span>Quantity</span>"+                        
                            "<div class='input-group'>"+                            
                                "<input type='text' id='quantity' name='quantity' class='form-control text-center input-number' value='1' min='1' max='"+data['quantity']+"' onkeyup='total()'>"+                            
                            "</div>"+                 
                            
                        "</div>"+  
                                                                    
                            
                        "<div class='product-price'>"+
                            "<h1 id='total_price'>" + data['price'] + " $</h1>"+
                            "<butoon class='btn btn-success ml-2' onclick='add_to_cart("+data['quantity']+")'>Add to cart</butoon>"+                        
                        "</div>"+
                    "</div>";           
            
                document.getElementById("productpage").innerHTML = demo;
            }
            else{
                demo = "<p>You are not allowed to view this page</p>";
                document.getElementById("productpage").innerHTML = demo;
            }
            
        },
        error: function(e){
            console.log(e);
        }
    });
}

function total(){
    var discount = $('#product_discount').val();
    var shipping = $('#product_shipping').val();
    var quantity = $('#quantity').val();
    var price = $('#price').val();
    var tot_price = 0;
    console.log(discount,shipping,quantity,price);
    if(quantity == ""){
        document.getElementById('total_price').innerHTML = '0$';
    }
    else{
        tot_price += parseFloat(price) * parseFloat(quantity) + parseFloat(shipping) - parseFloat(discount);    
        document.getElementById('total_price').innerHTML = parseFloat(tot_price).toFixed(2) + '$'; 
    }       
}

function add_to_cart(availalble){
    var base_url = window.location.origin;
    if($('#quantity').val() <= availalble){
        $.ajax({
            type:"POST",
            url: base_url + '/products/api/addtocart/',
            data: {"product": id,
                   "quantity": $('#quantity').val(),
                   "csrfmiddlewaretoken": $('input[name="csrfmiddlewaretoken"]').val()},
            success: function(data){                   
                document.getElementById("success").style.display = "block";
                var success = 'Just added to your cart'+
                            "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                                "<span aria-hidden='true'>&times;</span>"+
                            "</button>";
                document.getElementById("success").innerHTML = success;
            },
            error: function(e){
                console.log(e);
            }
        });
    }
    else {
        document.getElementById("error").style.display = "block";
        var error = "Quantity must be less than or equal to available item"+
                    "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                        "<span aria-hidden='true'>&times;</span>"+
                    "</button>";
        document.getElementById("error").innerHTML = error; 
    }
}
