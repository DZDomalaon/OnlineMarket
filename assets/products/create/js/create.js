$(document).ready(function(){    
    document.getElementById("discount").disabled = true;    
    
    // $('.scrollable').find(':checkbox:first').click(function () {
    //     $(this).closest('#categories').find(':checkbox').not(this).attr('disabled', this.checked)
    // });
    // $('.scrollable').find('input').click(function () {
    //     DoWork($(this).closest('.form-check'));
    // });     
    
    $('.scrollable #category input[type=checkbox]').click(function(){        
        id = $(this).attr('id');        
        console.log($(this).attr('value'));
        checked = $(this).attr('checked');            

        if ($(this).is(":checked")) {
            $('#category input[type=checkbox]').not(this).attr('disabled', true); 
            $('#sub_category input[type=checkbox]').not(this).attr('disabled', true);                               
        }
        else {
            $("input[type=checkbox]").not(this).removeAttr("disabled", true); 
        }
    });         
       
    // $("#sub_category input[type=checkbox]").click(function(){
    //     if ($(this).is(":checked")) {
    //         $("#sub_category input[type=checkbox]").removeAttr("checked");
    //         $(this).attr("checked", true);
    //     }
    // });
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
           alert(e);
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
