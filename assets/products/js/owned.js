$(document).ready(function(){    
    load_products();
});


function load_products() {
    
    var base_url = window.location.origin;
    
    $.ajax({
        type:"GET",
        url: base_url + '/products/api/ownedproducts/',     
        contentType: false,
        processData: false,     
        success: function(data){            
            var demo = "";        
            console.log(data);
            if(location.pathname.split('/')[2] == $('#auth_user').val()){
                $.each(data, function( index, value ){
                    product_url = base_url + '/products/' + value['id'];
                    console.log(value);
                    demo += "<div class='col-sm-12 col-lg-3'>"+
                                "<div class='card mb-2 mt-4 text-center'' id='productcard' style='width: 17rem;'>" +
                                    "<img src='"+ value['product_image'] +"' class='card-img-top'>" +
                                    "<div class='card-body'>" +
                                        "<p class='card-title'>"+ value['product_name'] + "</p>" +
                                        "<p class='card-text text-muted h6'>" + value['location'] + " | " + value['price'] + "</p>" +                                                                        
                                        "<a class='btn btn-dark ml-1'  id='viewproduct' href='" + product_url + "/productstatus' role='button' onclick='set_product_id(" + value['id'] + ")'>View</a>" +
                                        "<a class='btn btn-warning ml-2' href='" + product_url + "/updateproduct' role='button' onclick='set_product_id("+ value['id'] +")'>Update</a>" +                                    
                                    "</div>"+
                                "</div>"+
                            "</div>";
                            
                }); 
                document.getElementById("owned").innerHTML = demo; 
            }else {
                document.getElementById("check_owned").innerHTML = "You are not allowed to acces this page."; 
            }
                                  
        },
        error: function(e){
            console.log(e);
        }
    });
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

function delete_product(){
    
    var base_url = window.location.origin;
    var id = $('#deletebtn').val();
    console.log(id);
    
    $.ajax({
        type:"DELETE",
        url: base_url + '/products/api/deleteproduct/',
        data: {"product": id,
               "csrfmiddlewaretoken": csrftoken},
        success: function(data){            
            
            console.log(data);                                   
        },
        error: function(e){
            console.log(e);
        }
    });
}

function set_product_id(data) {    
    console.log($(this).data("value"));
    localStorage.setItem("product_id", JSON.stringify( data ));    
}




