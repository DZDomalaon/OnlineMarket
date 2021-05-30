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

function add_payment(){    
    var order = localStorage.getItem('order')
    var base_url = window.location.origin;    
    $.ajax({
        type:"POST",
        url: base_url + '/products/api/addpayment/',
        data: {            
            "order": order,             
            "csrfmiddlewaretoken": csrftoken,
            },            
        success: function(data){            
            alert('Successfully Added!')
        },
        error: function(e){
           console.log(e);
        }
    });
}
function load_products() {

    var base_url = window.location.origin;

    $.ajax({
        type:"GET",
        url: base_url + '/products/api/orderedproducts/',     
        contentType: false,
        processData: false,     
        success: function(data){            
            var demo = "";            
            localStorage.setItem('order', data['order'].id);           
            $.each(data['item'], function( index, value ){
                
                console.log(value['id']); 
                demo += "<div class='d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded'>"+
                            "<div class='col mr-1'><img class='rounded' src='"+ value.product.product_image +"' width='70'></div>"+
                            "<div class='col d-flex flex-column align-items-center product-details'><span class='font-weight-bold'>"+ value.product.product_name +"</span></div>"+
                            "<div class='col w-25 d-flex flex-row align-items-center qty'>"+
                                "<button class='btn btn-secondary' id='"+value.id+"' onclick='decrement("+ value.id +")'><i class='fa fa-minus text-white'></i></button>"+
                                "<input type='number' class='form-control text-center' onchange='update_item("+value.id+")' id='quantity"+value.id+"' value='"+value.quantity+"' min='1' style='width: 50px'></input>"+                                
                                "<button class='btn btn-secondary' id='"+value.id+"' onclick='increment("+value['id']+")'><i class='fa fa-plus text-white'></i></button>"+
                            "</div>"+
                            "<div class='col'>"+
                                "<h5 class='text-grey text-center'>"+value.quantity * value.product.price+"</h5>"+
                            "</div>"+
                            "<div class='col d-flex align-items-center'><button class='btn btn-secondary' onclick='remove_item("+value['id']+")'><i class='bi bi-archive'></i></i></button></div>"+
                        "</div>";                                
            });
            
            document.getElementById("usercart").innerHTML = demo;                       
        },
        error: function(e){
            document.getElementById("updatebtn").innerHTML = "<p>There is no item here</p>";
            console.log(e);
        }
    });
}

function update_price(data) {
    quantity = getElementById('quantity'+data).val;
    console.log(quantity);
}

function update_item(data) {
    var base_url = window.location.origin;
    var order_item = data;
    $.ajax({
        type:"POST",
        url: base_url + '/products/api/updateitem/',     
        data:{"order_item": order_item,
              "quantity": $("#quantity").val(),
              "csrfmiddlewaretoken": csrftoken,} , 
        success: function(data){            
            alert("Updated Successfully");
        },
        error: function(e){            
            console.log(e);
        }
    });
}

function remove_item(data){
    var base_url = window.location.origin;
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
              "csrfmiddlewaretoken": csrftoken,} , 
        success: function(data){            
            alert("Removed Successfully");
        },
        error: function(e){            
            console.log(e);
        }
    });
}
