$(document).ready(function(){    
    document.getElementById("discount").disabled = true;
    // cat = $('#product_category').val();
    // alert(cat);
});

function addProduct()
{
    var available_checkBox = document.getElementById("is_avalable");
    var discount_checkBox = document.getElementById("is_discounted");
    var category = $('#product_category').val();
    var subcategory = $('#product_subcategory').val();
    var discount = false;
    var available = false;

    if (discount_checkBox.checked == true){
        discount = true;
    }
    else{
        discount = false
    }

    if (available_checkBox.checked == true){
        available = true;
    }
    else{
        available = false
    }
    var base_url = window.location.origin;
    
    $.ajax({
        type:"POST",
        url: base_url + '/products/api/addproduct/',
        data: {  
            // "product": $('form').serializeArray(),     
            "product_name": $("#product_name").val(),
            "product_image": $("#product_image").val(),
            "description": $("#description").val(),
            "location": $("#location").val(),
            "product_category": JSON.parse(category),
            "product_subcategory": JSON.parse(subcategory),
            "quantity": $("#quantity").val(),
            "is_available": available,
            "is_discounted": discount,            
            "price": $("#price").val(),
            "shipping_fee": $("#shipping_fee").val(),
            "discount": $("#discount").val(),            
            "csrfmiddlewaretoken": $('input[name="csrfmiddlewaretoken"]').val(),
            },            
        enctype: 'multipart/form-data',
        success: function(data){
            console.log(data)
            alert('Successfully Added!')
        },
        error: function(e){
            console.log(e);
        }
    });
}

function enable_discount() {

    var checkBox = document.getElementById("is_discounted");
    var text = document.getElementById("discount");

    if (checkBox.checked == true) {
        text.disabled = false;
    } 
    else {
        text.disabled = true;        
    }
}

// function load_category() {

//     var base_url = window.location.origin;

//     $.ajax({
//         type:"GET",
//         url: base_url + '/products/api/getcategory/',     
//         success: function(data){            
//             var demo = ""; 
//             // for (var i = 0; i < data.length; i++) {
//             //     demo += "<p>"+ data[i].category +"</p>";
//             // }
//             $.each(data.categories, function( index, value ){
//                 console.log(this);
//                 demo += "<input class='form-check-input' type='checkbox' value='"+ value['category.id'] +"' id='" + value['categories.category'] + "'>" +
//                         "<label class='form-check-label' for='"+value['categories.id']+ "'>" + value['category'] + '</label><br>' +                        
//                         "<div class='form-check'>" +
//                             "<input class='form-check-input' type='checkbox' value='"+ value['subcategory.id'] +"' id='" + value['subcategory'] +"'>" +
//                             "<label class='form-check-label' for='"+ value['subcategory.id'] +"'>" + value['subcategory'] + '</label><br>' +
//                         '</div>';
//             });
            
//             document.getElementById("categories").innerHTML = demo;
//             // $("#categories").html(demo);            
//         },
//         error: function(e){
//             console.log(e);
//         }
//     });
// }