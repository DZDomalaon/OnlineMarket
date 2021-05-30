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

$(document).on('submit', '#updateProduct', function(event){
    var base_url = window.location.origin;
    var id = localStorage.getItem('product_id');
    var available_checkBox = document.getElementById("is_avalable");
    var discount_checkBox = document.getElementById("is_discounted");
    var category = document.getElementById("product_category").value;
    var subcategory = $('#product_subcategory').val();

    event.preventDefault();    
    console.log(category);    
    $.ajax({
        method:"post",
        url: base_url + '/products/api/updateproduct/',
        data: {
            "product": id,
            "product_name": $("#product_name").val(),
            // "product_image": $("#product_image").val(),  
            "description": $("#description").val(),
            "location": $("#location").val(),
            "product_category": category,
            "product_subcategory": subcategory,
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

function setTwoNumberDecimal(event) {
    this.value = parseFloat(this.value).toFixed(2);
}