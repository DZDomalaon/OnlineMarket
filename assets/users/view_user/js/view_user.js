$(document).ready(function(){    
    load_user();    
    load_products();
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
            console.log(data);             
            $.each(data, function( index, value ){                                
                console.log(value);
                demo += "<h2>"+ value +"</h2>";
            });
            
            document.getElementById("userpage").innerHTML = demo;                       
        },
        error: function(e){
            console.log(e);
        }
    });
}


function load_products () {
    var base_url = window.location.origin;    
    console.log(user);
    $.ajax({
        url: base_url + '/products/api/adminownedproducts/',
        type:"GET",
        data:{'user': user},                
        success: function(data){            
            var demo = "";             
            $.each(data, function( index, value ){
                product_url = base_url + '/products/' + value['id'];
                console.log(value);
                demo += "<div class='col-sm-12 col-lg-3'>" + 
                            "<div class='card mb-2 mt-4' id='productcard' style='width: 17rem;'>" +
                                "<img src='"+ value['product_image'] +"' class='card-img-top'>" +
                                "<div class='card-body'>" +
                                    "<p class='card-title'>"+ value['product_name'] + "</p>" +
                                    "<p class='card-text text-muted h6'>" + value['location'] + " | " + value['price'] + "</p>" +                                                                        
                                    "<a class='btn btn-dark ml-1'  id='viewproduct' href='" + product_url + "/viewproduct' role='button' data-value='" + value['id'] + "' onclick='send_product(event, " + value['id'] + ")'>View</a>" +
                                    "<a class='btn btn-warning ml-2' href='" + product_url + "/updateproduct' role='button'>Update</a>" +
                                    "<button class='btn btn-danger ml-2' data-toggle='modal' data-target='#deleteModal"+value['id']+"'>Delete</button>" +
                                "</div>" +
                            "</div>" +
                        "</div>"+

                        "<div class='modal fade bd-example-modal-sm' id='deleteModal"+value['id']+"' tabindex='-1' role='dialog'>"+
                            "<div class='modal-dialog modal-dialog-centered' role='document'>"+
                                "<div class='modal-content'>"+
                                    "<div class='modal-body'>"+
                                        "Do you want to delete "+value['product_name']+"?"+
                                    "</div>"+
                                    "<div class='modal-footer'>"+
                                        "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>"+                                        
                                        "<button type='button' class='btn btn-danger' id='deletebtn' value='"+value['id']+"' onclick='delete_product()'>Delete</button>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"+
                        "</div>";             
            });
            
            document.getElementById("owned").innerHTML = demo;                       
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
        url: base_url + '/products/api/adminorderedproducts/',     
        data:{'user': user}    ,
        success: function(data){            
            var demo = "";
            console.log(data);             
            $.each(data, function( index, value ){
                
                console.log(value.quantity); 
                demo += "<tr>"+
                            "<td>"+value['product'].product_name+"</td>"+
                            "<td><input type='number' name='points' step='1' value='"+value.quantity+"' onchange='quantity_change()'></td>"+                                                      
                            "<td>"+value.quantity * value.product.price+"</td>"+
                            "<td><button class='btn btn-warning' id='updatebtn' style='display: none'>Update</button></td>"+
                        "</tr>";
                                
            });            
            document.getElementById("usercart").innerHTML = demo;                       
        },
        error: function(e){
            console.log(e);
        }
    });
}