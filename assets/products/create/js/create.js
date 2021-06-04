$(document).ready(function(){    
    document.getElementById("discount").disabled = true;    
    
    // $('.scrollable').find(':checkbox:first').click(function () {
    //     $(this).closest('#categories').find(':checkbox').not(this).attr('disabled', this.checked)
    // });
    // $('.scrollable').find('input').click(function () {
    //     DoWork($(this).closest('.form-check'));
    // });     
    
    // $('#category input[type=checkbox]').click(function(){        
    //     id = $(this).attr('id');        
    //     console.log($(this).attr('value'));
    //     checked = $(this).attr('checked');            

    //     if ($(this).is(":checked")) {
    //         $('#category input[type=checkbox]').not(this).attr('disabled', true); 
    //         $('#sub_category input[type=checkbox]').not(this).attr('disabled', true);                               
    //     }
    //     else {
    //         $("input[type=checkbox]").not(this).removeAttr("disabled", true); 
    //     }
    // });         
       
    // $("#sub_category input[type=checkbox]").click(function(){
    //     if ($(this).is(":checked")) {
    //         $("#sub_category input[type=checkbox]").removeAttr("checked");
    //         $(this).attr("checked", true);
    //     }
    // });
});


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

$("#target").click(function() {
    alert( "Handler for .click() called." );
});

$(document).on('submit', '#addproduct', function(event){

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
    event.preventDefault();
    
    // var formData = new FormData();
    // formData.append("product_image", $("#product_image").prop('files')[0]);
    // formData.append("product_name", $("#product_name").val()); 
    // formData.append("description", $("#description").val());
    // formData.append("location", $("#location").val());
    // formData.append("product_category", $('#product_category').val());
    // formData.append("product_subcategory", $('#product_subcategory').val());
    // formData.append("quantity", $("#quantity").val());
    // formData.append("is_available", available);
    // formData.append("is_discounted", discount);
    // formData.append("price", $("#price").val());
    // formData.append("shipping_fee", $("#shipping_fee").val());
    // formData.append("discount", $("#discount").val());

    // $.ajaxSetup({
    //     headers: {                                                           
    //         'X-CSRF-Token': getCookie('csrftoken'),
    //     }
    //   });

    $.ajax({
        type:"POST",
        url: base_url + '/products/api/addproduct/',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('input[name="csrfmiddlewaretoken"]').val())
        },
        data:{
            "product_name": $("#product_name").val(),
            "product_image": $("#product_image").val(),
            "description": $("#description").val(),
            "location": $("#location").val(),
            "product_category": $('#product_category').val(),
            "product_subcategory": $('#product_subcategory').val(),
            "quantity": $("#quantity").val(),
            "is_available": available,
            "is_discounted": discount,            
            "price": $("#price").val(),
            "shipping_fee": $("#shipping_fee").val(),
            "discount": $("#discount").val(),
            "csrfmiddlewaretoken": $('input[name="csrfmiddlewaretoken"]').val(), 
        },                                            
        success: function(data){
            console.log(data)
            alert('Successfully Added!')
        },
        error: function(e){
            console.log(e);
        }
    });
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
