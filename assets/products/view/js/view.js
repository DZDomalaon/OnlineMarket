$(document).ready(function(){    
    load_product();
});

var id = $('#product_id').val();

function load_product() {

    var base_url = window.location.origin;    
    console.log(id);
    $.ajax({
        type:"GET",
        url: base_url + '/products/api/getproduct/',
        data: {'product': id},
        success: function(data){                                              
            var demo = "";                                
            console.log(data['quantity']);
            demo += "<div class='left-column'>"+
                        "<img src='" + data['product_image'] + "'>" +  
                    "</div>"+
                                
                    "<div class='right-column'>"+
                        
                    "<div class='product-description'>"+
                        "<span>" + data['product_category'] + "</span>"+
                        "<h1 id='prod'>" + data['product_name'] + "</h1>"+
                        "<p id='desc'> " + data['description'] + " </p>"+
                    "</div>"+
                                            
                    "<div class='product-quantity'>"+                        
                        // "<span class='input-group-btn'>"
                        //     "<button type='button' class='btn btn-default btn-number' disabled='disabled' data-type='minus' data-field=''>"+
                        //     "<span class='glyphicon glyphicon-minus'></span>"+
                        //     "</button>"+
                        // "</span>"+
                        // "<input type='text' name='quant[1]' class='form-control input-number' value='1' min='1' max='10'>"+
                        // "<span class='input-group-btn'>"+
                        //     "<button type='button' class='btn btn-default btn-number' data-type='plus' data-field='quant[1]'>"+
                        //     "<span class='glyphicon glyphicon-plus'></span>"+
                        //     "</button>"+
                        // "</span>"+
                        "<div class='row'>"+
                            "<div class='col'>"+
                                "<div class='product-shipping'>"+
                                    "<span>Original Price</span>"+
                                    "<p>" + data['price'] + "</p>"+
                                    "<input id='price' type='hidden' value='" +  data['price'] + "'>"+
                                "</div>"+
                            "</div>"+
                            "<div class='col'>"+
                                "<div class='product-discount'>"+
                                    "<span>Discount</span>"+
                                    "<p>" + data['discount'] + "</p>"+
                                    "<input id='product_discount' type='hidden' value='" +  data['discount'] + "'>"+
                                "</div>"+
                            "</div>"+
                            "<div class='col'>"+
                                "<div class='product-shipping'>"+
                                    "<span>Shipping Fee</span>"+
                                    "<p>" + data['shipping_fee'] + "</p>"+
                                    "<input id='product_shipping' type='hidden' value='" +  data['shipping_fee'] + "'>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                        "<span>Quantity</span>"+
                        "<div class='input-group'>"+
                            "<span class='input-group-btn'>"+
                                "<button type='button' class='quantity-left-minus btn btn-dark btn-number'  data-type='minus' data-field=''>"+
                                "<span class='glyphicon glyphicon-minus'></span>"+
                                "</button>"+
                            "</span>"+
                            "<input type='text' id='quantity' name='quantity' class='form-control input-number' value='1' min='1' max='"+data['quantity']+"' onkeyup='total()'>"+
                            "<span class='input-group-btn'>"+
                                "<button type='button' class='quantity-right-plus btn btn-dark btn-number' data-type='plus' data-field=''>"+
                                    "<span class='glyphicon glyphicon-plus'></span>"+
                                "</button>"+
                            "</span>"+
                        "</div>"+
                    "</div>"+  
                                                                   
                        
                    "<div class='product-price'>"+
                        "<h1 id='total_price'>" + data['price'] + " $</h1>"+
                        "<butoon class='btn btn-success ml-2' onclick='add_to_cart()'>Add to cart</butoon>"+                        
                    "</div>"+
                "</div>";            
            
            document.getElementById("productpage").innerHTML = demo;
        },
        error: function(e){
            console.log(e);
        }
    });
}

function total(){
    var discount = $('#product_discount').val();
    var shipping = $('#product_shipping').val();
    var quantity = $('#quantity').val();
    var price = $('#price').val();
    var tot_price = 0;
    console.log(discount,shipping,quantity,price);
    tot_price += parseFloat(price) * parseFloat(quantity) + parseFloat(shipping) - parseFloat(discount);
    
    document.getElementById('total_price').innerHTML = parseFloat(tot_price).toFixed(2) + '$';    
}

function add_to_cart(){
    var base_url = window.location.origin;
    // var id = $('#product_id').val();
    console.log(id);
    $.ajax({
        type:"POST",
        url: base_url + '/products/api/addtocart/',
        data: {"product": id,
               "quantity": $('#quantity').val(),
               "csrfmiddlewaretoken": $('input[name="csrfmiddlewaretoken"]').val()},
        success: function(data){   
            alert('Just added to your cart');
        },
        error: function(e){
            console.log(e);
        }
    });
}

$('.btn-number').click(function(e){
    e.preventDefault();
    
    fieldName = $(this).attr('data-field');
    type      = $(this).attr('data-type');
    var input = $("input[name='"+fieldName+"']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if(type == 'minus') {
            
            if(currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            } 
            if(parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if(type == 'plus') {

            if(currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if(parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});
$('.input-number').focusin(function(){
   $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {
    
    minValue =  parseInt($(this).attr('min'));
    maxValue =  parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());
    
    name = $(this).attr('name');
    if(valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    
    
});
$('.btn-number').click(function(e) {
    e.preventDefault();

    fieldName = $(this).attr('data-field');
    type = $(this).attr('data-type');
    var input = $("input[name='" + fieldName + "']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if (type == 'minus') {

            if (currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            }
            if (parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if (type == 'plus') {

            if (currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if (parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});


$('.input-number').focusin(function() {
    $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {

    minValue = parseInt($(this).attr('min'));
    maxValue = parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());

    name = $(this).attr('name');
    if (valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if (valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }


});
