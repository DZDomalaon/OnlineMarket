$(document).ready(function(){    
    load_products();
});

function load_products() {

    var base_url = window.location.origin;

    $.ajax({
        type:"GET",
        url: base_url + '/products/api/getproducts/',     
        contentType: false,
        processData: false,     
        success: function(data){            
            var demo = ""; 
            // for (var i = 0; i < data.length; i++) {
            //     demo += "<p>"+ data[i].category +"</p>";
            // }
            console.log(data);
            $.each(data, function( index, value ){
                console.log(value);
                demo += "<div class='col md-3'>" + 
                            "<div class='card mb-2 mt-4' id='productcard' style='width: 15rem;'>" +
                                "<img src='"+ value['product_image'] +"' class='card-img-top'>" +
                                "<div class='card-body'>" +
                                    "<p class='card-title'>"+ value['product_name'] + "</p>" +
                                    "<p class='card-text text-muted h6'>" + value['location'] + " | " + value['price'] + "</p>" +
                                    "<button type='button' class='btn btn-dark'> View </button>" +
                                   
                                    "<button type='button' class='btn btn-dark'> Checkout </button>" +                                   
                                "</div>" +
                            "</div>" +
                        "</div>";
            });
            
            document.getElementById("featured").innerHTML = demo;                       
        },
        error: function(e){
            console.log(e);
        }
    });
}