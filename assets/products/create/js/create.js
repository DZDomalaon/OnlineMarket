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
    (function() {
        'use strict';
        window.addEventListener('load', function() {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);
    })();
});

$("#target").click(function() {
    alert( "Handler for .click() called." );
});

$(document).on('submit', '#addproduct', function(event){

    var base_url = window.location.origin;
    event.preventDefault();    
    var available_checkBox = document.getElementById("is_avalable");
    var discount_checkBox = document.getElementById("is_discounted");
    var category =  localStorage.getItem("category_id");
    var subcategory = localStorage.getItem("subcategory_id");
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
    
    var formData = new FormData();
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
        type:"POST",
        processData: false,
        contentType: false,
        url: base_url + '/products/api/addproduct/',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRFToken', $('input[name="csrfmiddlewaretoken"]').val())
        },
        data: formData,                                                       
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

function set_category_id(data) {        
    localStorage.setItem("category_id", data);    
}

function set_subcategory_id(data) {        
    localStorage.setItem("subcategory_id", data);    
}