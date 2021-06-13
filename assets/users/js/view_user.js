$(document).ready(function(){    
    load_user();    
    load_products();
    load_cart_items();
    load_ordered_products();
});

user = localStorage.getItem("user_id");

function load_user() {

    var base_url = window.location.origin;    

    $.ajax({
        type:"GET",
        data: {"user": user},
        url: base_url + '/users/api/getuser/',
        success: function(data){                        
            var demo = "";
            // console.log(data);      
            demo += "<h2>"+ data['first_name'] + " " + data['last_name'] +"</h2>";         
            document.getElementById("userpage").innerHTML = demo;                       
        },
        error: function(e){
            console.log(e);
        }
    });
}


function load_products () {
    var base_url = window.location.origin;    
    // console.log(user);
    $.ajax({
        url: base_url + '/products/api/adminownedproducts/',
        type:"GET",
        data:{'user': user},                
        success: function(data){            
            var demo = "";             
            $.each(data, function( index, value ){
                product_url = base_url + '/products/' + value['id'];
                // console.log(value);
                demo += "<div class='col-sm-12 col-lg-3 text-center'>" + 
                            "<div class='card mb-2 mt-4' id='productcard' style='width: 17rem;'>" +
                                "<img src='"+ value['product_image'] +"' class='card-img-top'>" +
                                "<div class='card-body'>" +
                                    "<p class='card-title'>"+ value['product_name'] + "</p>" +
                                    "<p class='card-text text-muted h6'>" + value['location'] + " | " + value['price'] + "</p>" +                                                                        
                                    "<a class='btn btn-dark ml-1'  id='viewproduct' href='" + product_url + "/viewproduct' role='button' data-value='" + value['id'] + "' onclick='send_product(event, " + value['id'] + ")'>View</a>" +
                                    // "<a class='btn btn-warning ml-2' href='" + product_url + "/updateproduct' role='button'>Update</a>" +
                                    // "<button class='btn btn-danger ml-2' data-toggle='modal' data-target='#deleteModal"+value['id']+"'>Delete</button>" +
                                "</div>" +
                            "</div>" +
                        "</div>";             
            });
            
            document.getElementById("owned").innerHTML = demo;                       
        },
        error: function(e){
            console.log(e);
        }
    });
}

function load_cart_items() {
    var base_url = window.location.origin;

    $.ajax({
        type:"GET",
        url: base_url + '/products/api/adminorderedproducts/',     
        data:{'user': user}    ,
        success: function(data){            
            var demo = "";
            var items = data['cart_item'];
            console.log(items.length);    
            
            if(items.length > 0){
                $.each(data, function( index, value ){
                
                    // console.log(value.quantity); 
                    demo += "<tr>"+
                                "<td>"+value['product'].product_name+"</td>"+
                                "<td><input type='number' name='points' step='1' value='"+value.quantity+"' onchange='quantity_change()'></td>"+                                                      
                                "<td>"+value.quantity * value.product.price+"</td>"+
                                "<td><button class='btn btn-warning' id='updatebtn' style='display: none'>Update</button></td>"+
                            "</tr>";
                                    
                });            
                document.getElementById("usercart").innerHTML = demo; 
            }else{
                document.getElementById("cart").innerHTML = "<h3>No items found</h3>";
            }
                                  
        },
        error: function(e){
            console.log(e);
        }
    });
}

function load_ordered_products() {
    var base_url = window.location.origin;

    $.ajax({
        type:"GET",
        url: base_url + '/products/api/userorders/',     
        data:{'user': user}    ,
        success: function(data){            
            var order = "";
            // var items = data['cart_item'];
            console.log(data);    
            
            for(var i=0; i < data['order'].length; i++){
                for(var j=0; j< data['order'][i]['order_item'].length; j++){
                order +="<tr>"+
                            "<td>"+data['order'][i]['order_item'][j]['product']['product_name']+"</td>"+
                            "<td>"+data['order'][i]['order_item'][j]['quantity']+"</td>"+                                                      
                            "<td>"+data['order'][i]['order_item'][j]['date_added']+"</td>"+
                            (data['order'][i]['order_item'][j]['is_shipping'] == false ? "<td>Seller is preparing to ship your parcel</td>" : "<td>Parcel is out for delivery</td>")+                              
                        "</tr>";                 
                }                
            }
            document.getElementById("orders").innerHTML = order; 
                                  
        },
        error: function(e){
            console.log(e);
        }
    });
}