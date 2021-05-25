$(document).ready(function(){    
    load_products();
});

$('#search').keyup(function (){
    $('.card').removeClass('d-none');
    var filter = $(this).val();
    $('.card-deck').find('.card .card-body h4:not(:contains("'+filter+'"))').parent().parent().addClass('d-none');
})

jQuery.expr[':'].contains = function(a, i, m) {
    return jQuery(a).text().toUpperCase()
        .indexOf(m[3].toUpperCase()) >= 0;
};

function load_products() {

    var user = $('#auth_user').val();
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
                console.log(value['product_image']);
                product_url = base_url + '/products/' + value['id'];
                demo += "<div class='col-sm-12 col-lg-3'>"+
                            "<div class='card ml-2 mb-2 mt-4 text-center' id='productcard' style='min-width: 15rem;'>" +
                                "<img src='"+ value['product_image'] +"' class='card-img-top' type='image/webp'>" +
                                "<div class='card-body'>" +
                                    "<h4 class='card-title'>"+ value['product_name'] + "</h4>" +                                
                                    "<button type='button' class='btn btn-dark ml-2'> View </button>" +
                                    // if statement                                                                        
                                    (value['seller_id'] != user ? "<a href='" + product_url + "/viewproduct' role='button' class='btn btn-success ml-2'>Add to Cart</a>" : '')+                                
                                "</div>" +
                            "</div>"+
                        "</div>";
            });
            
            document.getElementById("featured").innerHTML = demo;                       
            document.getElementById("popular").innerHTML = demo;          
        },
        error: function(e){
            console.log(e);
        }
    });
}