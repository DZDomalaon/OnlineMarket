$(document).ready(function(){    
    load_categories();
});

function load_categories(){

    var user = $('#auth_user').val();
    var base_url = window.location.origin;
    var category = localStorage.getItem("category");
    $.ajax({
        type:"GET",
        url: base_url + '/products/api/undercategories/',     
        data:{"category": category},
        success: function(data){            
            var demo = ""; 
            // for (var i = 0; i < data.length; i++) {
            //     demo += "<p>"+ data[i].category +"</p>";
            // }
            console.log(data);
            $.each(data, function( index, value ){
                console.log(value['subcategory']);
                var category = value['subcategory'];
                product_url = base_url + '/products/';
               demo += "<div class='col-sm-12 col-lg-3'>"+
                            "<div class='card ml-2 mb-2 mt-4 text-center' id='productcard' style='min-width: 15rem;'>" +
                                "<img src='"+ value['product_image'] +"' class='card-img-top' type='image/webp'>" +
                                "<div class='card-body'>" +
                                    "<h4 class='card-title'>"+ value['product_name'] + "</h4>" + 
                                    "<p class='card-text text-muted h6'>" + value['location'] + " | " + value['price'] + "</p>" +                               
                                    (value['seller'] == user ? "<a class='btn btn-secondary' href='" + product_url + "/productstatus' type='button' class='btn btn-dark ml-2'> View </a>": '') +                                                                    
                                    (value['seller'] != user ? "<a href='" + product_url + "/viewproduct' role='button' class='btn btn-success ml-2'>Add to Cart</a>" : '')+                                
                                "</div>"+
                            "</div>"+
                        "</div>";
            });            
            document.getElementById("products").innerHTML = demo;       
        },
        error: function(e){
            console.log(e);
        }
    });
}