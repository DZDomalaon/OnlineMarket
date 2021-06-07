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

    event.preventDefault();    
    var base_url = window.location.origin;
    var id = localStorage.getItem('product_id');
    var available_checkBox = document.getElementById("is_avalable");
    var discount_checkBox = document.getElementById("is_discounted");
    var category = localStorage.getItem("category_id");
    var subcategory = localStorage.getItem("subcategory_id");

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

    var formData = new FormData();
    formData.append("product", id);
    formData.append("product_image", $("#product_image").prop('files')[0]);
    formData.append("product_name", $("#product_name").val()); 
    formData.append("description", $("#description").val());
    formData.append("location", $("#location").val());
    formData.append("product_category", category);
    formData.append("product_subcategory", subcategory);
    formData.append("quantity", $("#quantity").val());
    formData.append("is_available", available);
    formData.append("is_discounted", discount);
    formData.append("price", $("#price").val());
    formData.append("shipping_fee", $("#shipping_fee").val());
    formData.append("discount", $("#discount").val());
 
    $.ajax({
        method:"post",
        processData: false,
        contentType: false,
        url: base_url + '/products/api/updateproduct/',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRFToken', $('input[name="csrfmiddlewaretoken"]').val())
        },
        data: formData,                   
        success: function(data){
            console.log(data)
            alert('Successfully updated!')
        },
        error: function(e){
            console.log(e);
        }
    });
});

function set_category_id(data) {        
    localStorage.setItem("category_id", data);    
}

function set_subcategory_id(data) {        
    localStorage.setItem("subcategory_id", data);    
}