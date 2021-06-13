$(document).ready(function(){    
    // document.getElementById("updatebtn").display = true;
    load_products();    

    $(function(){
        $("#errorbtn").on("click", function(){
            $("#error").hide();
        });
    });
});

function quantity_change(){
    var x = document.getElementById("updatebtn");      
    x.style.display = "block";
}

function increment(data) {
    document.getElementById('quantity'+data).stepUp();
    update_item();
}

function decrement(data) {
    document.getElementById('quantity'+data).stepDown();
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');


function load_products() {

    var base_url = window.location.origin;
    var get_items = [];
    var quantity = [];
    $.ajax({
        type:"GET",
        url: base_url + '/products/api/orderedproducts/',     
        contentType: false,
        processData: false,     
        success: function(data){  
            
            // var pk = window.location.href.match(/users\/(\d+)/);
            // console.log(data['item'][0]['product']['is_available']);
            if(location.pathname.split('/')[2] == $('#auth_user').val()){
                var demo = "";            
                var total = 0;
                var shipping_fee = 0;
                var discount = 0;
                var sub_total=0;
                if(data != 404){
                    localStorage.setItem('cart', data['cart']['id']);
                    $.each(data['item'], function( index, value ){
                        get_items.push(value['product']['id']);
                        quantity.push(value['quantity']);
                        shipping_fee += parseFloat(value['product']['shipping_fee']);
                        discount += parseFloat(value['product']['discount']);
                        sub_total = parseFloat(value['product']['price']) * parseFloat(value['quantity']);
                        total += sub_total;
                        demo += "<div class='d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded'>"+
                                    "<div class='col mr-1'><img class='rounded' src='"+ value['product']['product_image'] +"' width='70'></div>"+
                                    "<div class='col d-flex flex-column align-items-center product-details'><span class='font-weight-bold'>"+ value['product']['product_name'] +"</span></div>"+
                                    "<div class='col w-25 d-flex flex-row align-items-center qty'>"+
                                        "<button class='btn btn-secondary' id='"+value['id']+"' onclick='decrement("+ value['id'] +")'><i class='fa fa-minus text-white'></i></button>"+
                                        "<input type='number' class='form-control text-center' onchange='update_item("+value['id']+","+value['product']['quantity']+")' id='quantity"+value['id']+"' value='"+value['quantity']+"' min='1' style='width: 50px'></input>"+                                
                                        "<button class='btn btn-secondary' id='"+value['id']+"' onclick='increment("+value['id']+")'><i class='fa fa-plus text-white'></i></button>"+
                                    "</div>"+
                                    "<div class='col'>"+
                                        "<h5 class='text-grey text-center'>"+sub_total+"</h5>"+
                                    "</div>"+
                                    "<div class='col d-flex align-items-center'><button class='btn btn-secondary' onclick='remove_item("+value['id']+")'><i class='bi bi-trash'></i></button></div>"+
                                "</div>";                                
                    });
                    for(var i=0; i<data['item'].length; i++){
                        if(data['item'][i]['product']['is_available'] == false){                                       
                            var error = data['item'][i]['product']['product_name']+" is currently unavailable. Please remove it from your cart"+
                                        "<button id='errorbtn' type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                                            "<span aria-hidden='true'>&times;</span>"+
                                        "</button>";
                            document.getElementById('error').style.display = "block";
                            document.getElementById("error").innerHTML = error;
                            // $(".alert").delay(4000).slideUp(200, function() {
                            //     $(this).alert('close');
                            // });
                        }
                    }                
                    document.getElementById("discount").textContent="$ "+discount;
                    document.getElementById("fee").textContent="$ "+shipping_fee;
                    document.getElementById("total").textContent="$ "+((total + shipping_fee) - discount);
                    localStorage.setItem('item', JSON.stringify(get_items)); 
                    localStorage.setItem('total', ((total + shipping_fee) - discount));
                    localStorage.setItem('quantity', JSON.stringify(quantity));
                    document.getElementById("usercart").innerHTML = demo;       
                }                  
                else {
                    demo = "<p>There is no item here</p>";
                    document.getElementById("cart").innerHTML = demo; 
                }                     
            }else {
                document.getElementById("cart").innerHTML = "You are not allowed to access this page."; 
            }            
                   
        },
        error: function(e){            
            console.log(e);
        }
    });
}

function update_price(data) {
    quantity = getElementById('quantity'+data).val();
    console.log(quantity);
}


function update_item(data, stock) {
    var base_url = window.location.origin;
    quantity = document.getElementById('quantity'+data).value;
    if(quantity<=stock){
        console.log(stock);
    }

    var item = data;
    $.ajax({
        type:"POST",
        url: base_url + '/products/api/updateitem/',     
        data:{"cart_item": item,
              "quantity": quantity,
              "csrfmiddlewaretoken": csrftoken,} , 
        success: function(data){            
            load_products();
        },
        error: function(e){                                    
            var error = e.responseJSON['error']+
                        "<button type='button' class='close' data-hide='alert' aria-label='Close'>"+
                            "<span aria-hidden='true'>&times;</span>"+
                        "</button>";
            document.getElementById('error').style.display = "block";
            document.getElementById("error").innerHTML = error;
            // $(".alert").delay(4000).slideUp(200, function() {
            //     $(this).alert('close');
            // });           
        }
    });
}

function remove_item(data){
    var base_url = window.location.origin;
    var product = localStorage.getItem("product_id")
    var item = data;
    $.ajaxSetup({
        headers: {            
            "X-CSRFToken": csrftoken
        }
    });    
    $.ajax({            
        type:"DELETE",        
        url: base_url + '/products/api/removeitem/',
        data:{"cart_item": item,
              "quantity": $("#quantity").val(),
              "csrfmiddlewaretoken": csrftoken,},
        success: function(data){
            // document.getElementById("success").style.display = "block";
            // var success="Removed Successfully"+
            //             "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
            //                 "<span aria-hidden='true'>&times;</span>"+
            //             "</button>";
            // document.getElementById("success").innerHTML = success;
            load_products();
            item_count();
        },
        error: function(e){            
            console.log(e);
        }
    });
}

function create_order(){
    var item = JSON.parse(localStorage.getItem('item'));
    var quantity = JSON.parse(localStorage.getItem('quantity'));
    var cart = localStorage.getItem('cart');
    var base_url = window.location.origin;    
    $.ajax({
        type:"POST",
        url: base_url + '/products/api/addorder/',
        data: {                        
            "item": item,
            "quantity": quantity,    
            "cart": cart,
            "csrfmiddlewaretoken": csrftoken,
            },            
        success: function(data){            
            console.log(data);
        },
        error: function(e){
            console.log(e);
        }
    });
}
