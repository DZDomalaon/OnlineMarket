$(document).ready(function(){    
    document.getElementById("discount").disabled = true;
    // cat = $('#product_category').val();
    // alert(cat);
});

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

// function updateProduct(event)
// {
//     event.preventDefault();
    
//     var available_checkBox = document.getElementById("is_avalable");
//     var discount_checkBox = document.getElementById("is_discounted");
//     var category = $('#product_category').val();
//     var subcategory = $('#product_subcategory').val();
//     var discount = false;
//     var available = false;

//     if (discount_checkBox.checked == true){
//         discount = true;
//     }
//     else{
//         discount = false
//     }

//     if (available_checkBox.checked == true){
//         available = true;
//     }
//     else{
//         available = false
//     }
//     var base_url = window.location.origin;
//     alert("Pass");
//     // $.ajax({
//     //     method:"post",
//     //     url: base_url + '/products/api/updateproduct/',
//     //     data: {
//     //         "product_name": $("#product_name").val(),
//     //         "product_image": $("#product_image").val(),
//     //         "description": $("#description").val(),
//     //         "location": $("#location").val(),
//     //         "product_category": JSON.parse(category),
//     //         "product_subcategory": JSON.parse(subcategory),
//     //         "quantity": $("#quantity").val(),
//     //         "is_available": available,
//     //         "is_discounted": discount,            
//     //         "price": $("#price").val(),
//     //         "shipping_fee": $("#shipping_fee").val(),
//     //         "discount": $("#discount").val(),            
//     //         "csrfmiddlewaretoken": $('input[name="csrfmiddlewaretoken"]').val(),
//     //         },            
//     //     enctype: 'multipart/form-data',
//     //     success: function(data){
//     //         console.log(data)
//     //         alert('Successfully updated!')
//     //     },
//     //     error: function(e){
//     //         console.log(e);
//     //     }
//     // });
// }

$(document).on('submit', '#updateProduct', function(event){
    var base_url = window.location.origin;
    event.preventDefault();    
    console.log("pass");    
    $.ajax({
        method:"post",
        url: base_url + '/products/api/updateproduct/',
        data: {
            "product_name": $("#product_name").val(),
            "product_image": $("#product_image").val(),
            "description": $("#description").val(),
            "location": $("#location").val(),
            // "product_category": JSON.parse(category),
            // "product_subcategory": JSON.parse(subcategory),
            "quantity": $("#quantity").val(),
            // "is_available": available,
            // "is_discounted": discount,            
            "price": $("#price").val(),
            "shipping_fee": $("#shipping_fee").val(),
            "discount": $("#discount").val(),            
            "csrfmiddlewaretoken": $('input[name="csrfmiddlewaretoken"]').val(),
            },            
        enctype: 'multipart/form-data',
        success: function(data){
            console.log(data)
            alert('Successfully updated!')
        },
        error: function(e){
            console.log(e);
        }
    });
});