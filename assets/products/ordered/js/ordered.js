$(document).ready(function(){    
    // document.getElementById("updatebtn").display = true;
    load_products();    
});

function quantity_change(){
    var x = document.getElementById("updatebtn");      
    x.style.display = "block";
}

function increment(data) {
    document.getElementById(data).stepUp();
}

function decrement(data) {
    document.getElementById(data).stepDown();
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
            console.log(data['order']['buyer']);
            var demo = "";            
            localStorage.setItem('order', data['order']['id']); 
            if(data['order']['buyer'] == $("#auth_user").val()){
                $.each(data['item'], function( index, value ){
                    get_items.push(value['product']['id']);
                    quantity.push(value['quantity']);
                    
                    demo += "<div class='d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded'>"+
                                "<div class='col mr-1'><img class='rounded' src='"+ value['product']['product_image'] +"' width='70'></div>"+
                                "<div class='col d-flex flex-column align-items-center product-details'><span class='font-weight-bold'>"+ value['product']['product_name'] +"</span></div>"+
                                "<div class='col w-25 d-flex flex-row align-items-center qty'>"+
                                    "<button class='btn btn-secondary' id='"+value['id']+"' onclick='decrement("+ value['id'] +")'><i class='fa fa-minus text-white'></i></button>"+
                                    "<input type='number' class='form-control text-center' onchange='update_item("+value['id']+")' id='quantity"+value['id']+"' value='"+value['quantity']+"' min='1' style='width: 50px'></input>"+                                
                                    "<button class='btn btn-secondary' id='"+value['id']+"' onclick='increment("+value['id']+")'><i class='fa fa-plus text-white'></i></button>"+
                                "</div>"+
                                "<div class='col'>"+
                                    "<h5 class='text-grey text-center'>"+value['quantity'] * value['product']['price']+"</h5>"+
                                "</div>"+
                                "<div class='col d-flex align-items-center'><button class='btn btn-secondary' onclick='remove_item("+value['id']+")'><i class='bi bi-trash'></i></button></div>"+
                            "</div>";                                
                });                
                localStorage.setItem('item', JSON.stringify(get_items)); 
                localStorage.setItem('quantity', JSON.stringify(quantity));
                document.getElementById("usercart").innerHTML = demo;       
            }                  
            else {
                demo = "<p>You are not allowed to view this page</p>";
                document.getElementById("usercart").innerHTML = demo; 
            }
                            
        },
        error: function(e){
            document.getElementById("updatebtn").innerHTML = "<p>There is no item here</p>";
            console.log(e);
        }
    });
}

function update_price(data) {
    quantity = getElementById('quantity'+data).val();
    console.log(quantity);
}

function update_item(data) {
    var base_url = window.location.origin;
    quantity = document.getElementById('quantity'+data).value;
    var order_item = data;
    $.ajax({
        type:"POST",
        url: base_url + '/products/api/updateitem/',     
        data:{"order_item": order_item,
              "quantity": quantity,
              "csrfmiddlewaretoken": csrftoken,} , 
        success: function(data){                        
            var success = 'Updated Successfully'+
                            "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                                "<span aria-hidden='true'>&times;</span>"+
                            "</button>";
            document.getElementById("success").innerHTML = success;
            load_products();
        },
        error: function(e){            
            console.log(e);
        }
    });
}

function remove_item(data){
    var base_url = window.location.origin;
    var product = localStorage.getItem("product_id")
    var order_item = data;
    $.ajaxSetup({
        headers: {            
            "X-CSRFToken": csrftoken
        }
    });    
    $.ajax({            
        type:"DELETE",        
        url: base_url + '/products/api/removeitem/', 
        data:{"order_item": order_item,              
              "quantity": $("#quantity").val(),
              "csrfmiddlewaretoken": csrftoken,}, 
        success: function(data){                
            var success = 'Removed Successfully'+
                            "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                                "<span aria-hidden='true'>&times;</span>"+
                            "</button>";
            document.getElementById("success").innerHTML = success;
            load_products();
        },
        error: function(e){            
            console.log(e);
        }
    });
}
