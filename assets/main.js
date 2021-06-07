$(document).ready(function(){    
    load_products();
    load_sale();
    load_categories();

    $("#subcategory").change(function(){
        localStorage.setItem("subcategory",($('#subcategory option:selected').val()));
    })
});

// $('#search').keyup(function (){
//     $('.card').removeClass('d-none');
//     var filter = $(this).val();
//     $('.card-deck').find('.card .card-body h4:not(:contains("'+filter+'"))').parent().parent().addClass('d-none');
// })

// jQuery.expr[':'].contains = function(a, i, m) {
//     return jQuery(a).text().toUpperCase()
//         .indexOf(m[3].toUpperCase()) >= 0;
// };

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

function search(){
    console.log("here");
    var user = $('#auth_user').val();
    var subcategory = localStorage.getItem("subcategory");
    var base_url = window.location.origin;
    var demo = "";
    $.ajax({
        type:"POST",
        url: base_url + '/products/api/search/',       
        data:{"product": $("#search").val(),  
              "subcategory": subcategory,
              "csrfmiddlewaretoken": csrftoken,},  
        success: function(data){                          
            $.each(data, function( index, value ){
                // console.log(value['seller']);
                product_url = base_url + '/products/' + value['id'];
                demo += "<div class='col-sm-12 col-lg-3'>"+
                            "<div class='card ml-2 mb-2 mt-4 text-center' id='productcard' style='min-width: 15rem;'>" +
                                "<img src='"+ value['product_image'] +"' class='card-img-top' type='image/webp'>" +
                                "<div class='card-body'>" +
                                    "<h4 class='card-title'>"+ value['product_name'] + "</h4>" +   
                                    "<p class='card-text text-muted h6'>" + value['location'] + " | " + value['price'] + "</p>" +                             
                                    (value['seller'] == user ? "<a class='btn btn-secondary' href='" + product_url + "/productstatus' type='button' class='btn btn-dark ml-2'> View </a>": '') +                                                                  
                                    (value['seller'] != user ? "<a href='" + product_url + "/viewproduct' role='button' class='btn btn-success ml-2'>Add to Cart</a>" : '')+                                
                                "</div>" +
                            "</div>"+
                        "</div>";
            });     
            document.getElementById("featured").innerHTML = demo;  
        },
        error: function(e){
            demo = "<p class='text-center'>No items found</p>";
            document.getElementById("featured").innerHTML = demo;  
        }
    })
}

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
            // console.log(data);
            $.each(data, function( index, value ){
                // console.log(value['seller']);
                product_url = base_url + '/products/' + value['id'];
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
            
            document.getElementById("featured").innerHTML = demo;                       
            document.getElementById("popular").innerHTML = demo;          
        },
        error: function(e){
            console.log(e);
        }
    });
}

function load_sale(){
    var user = $('#auth_user').val();
    var base_url = window.location.origin;

    $.ajax({
        type:"GET",
        url: base_url + '/products/api/saleproducts/',     
        contentType: false,
        processData: false,     
        success: function(data){            
            var demo = ""; 
            // for (var i = 0; i < data.length; i++) {
            //     demo += "<p>"+ data[i].category +"</p>";
            // }
            // console.log(data);
            $.each(data, function( index, value ){
                console.log(value['seller']);
                product_url = base_url + '/products/' + value['id'];
                demo += "<div class='col-sm-12 col-lg-3'>"+
                            "<div class='card ml-2 mb-2 mt-4 text-center' id='productcard' style='min-width: 15rem;'>" +
                                "<img src='"+ value['product_image'] +"' class='card-img-top' type='image/webp'>" +
                                "<div class='card-body'>" +
                                    "<h4 class='card-title'>"+ value['product_name'] + "</h4>" +  
                                    "<p class='card-text text-muted h6'>" + value['location'] + " | " + value['price'] + "</p>" +                              
                                    (value['seller'] == user ? "<a class='btn btn-secondary' href='" + product_url + "/productstatus' type='button' class='btn btn-dark ml-2'> View </a>": '') +                                                                                                          
                                    (value['seller'] != user ? "<a href='" + product_url + "/viewproduct' role='button' class='btn btn-success ml-2'>Add to Cart</a>" : '')+                                
                                "</div>" +
                            "</div>"+
                        "</div>";
            });
            
            document.getElementById("sale").innerHTML = demo;       
        },
        error: function(e){
            console.log(e);
        }
    });
}

function load_categories(){
        
    var base_url = window.location.origin;

    $.ajax({
        type:"GET",
        url: base_url + '/products/api/categories/',     
        contentType: false,
        processData: false,     
        success: function(data){            
            var demo = ""; 
            // for (var i = 0; i < data.length; i++) {
            //     demo += "<p>"+ data[i].category +"</p>";
            // }
            console.log(data);
            $.each(data, function( index, value ){
                console.log(value['id']);
                var category = value['subcategory'];
                product_url = base_url + '/products/' + value['id'];
                demo += "<div class='col-sm-12 col-lg-3'>"+
                            "<div class='card ml-2 mb-2 mt-4 text-center' id='productcard' style='min-width: 15rem;'>" +
                                "<img src='"+ value['subcategory_img'] +"' class='card-img-top' type='image/webp'>" +
                                "<div class='card-body'>" +
                                    "<h4 class='card-title'>"+ value['name'] + "</h4>"+
                                    "<a class='btn btn-secondary' href='"+product_url+"/undercategory' type='button' class='btn btn-dark ml-2' onclick='get_category("+value['id']+")'> View </a>"+                                                         
                                "</div>" +
                            "</div>"+
                        "</div>";
            });            
            document.getElementById("categories").innerHTML = demo;       
        },
        error: function(e){
            console.log(e);
        }
    });
}

function get_category(category){    
    localStorage.setItem("category", category);
}