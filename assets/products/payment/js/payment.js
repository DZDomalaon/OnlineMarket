$(document).ready(function(){    
    load_product();    
    $(function() {
        $('[data-toggle="tooltip"]').tooltip()
    });
    localStorage.setItem("method", "Card");
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

// function add_payment(){    
//     var order = localStorage.getItem('order');
//     var item = JSON.parse(localStorage.getItem('item'));
//     var quantity = JSON.parse(localStorage.getItem('quantity'));
//     var method = localStorage.getItem("method");
//     var expiration = $("#expire_m").val() + "/" + $("#expire_y").val();
//     var base_url = window.location.origin;    
//     $.ajax({
//         type:"POST",
//         url: base_url + '/products/api/addpayment/',
//         data: {            
//             "order": order,             
//             "item": item,
//             "quantity": quantity,
//             "name": $('#name').val(),
//             "card_number": $("#cardNumber").val(),
//             "cvv": $("#cvv").val(),            
//             "expiration": expiration,
//             "address": address,
//             "payment_method": method,
//             "csrfmiddlewaretoken": csrftoken,
//             },            
//         success: function(data){            
//             alert('Successfully Added!')
//         },
//         error: function(e){
//            console.log(e);
//         }
//     });
// }

$("#cod").on("click", function() {
    localStorage.setItem("method", "COD");
});

$("#card").on("click", function() {
    localStorage.setItem("method", "Card");
});

$(document).on('submit', '#cardform', function(event){
    var order = localStorage.getItem('order');
    var item = JSON.parse(localStorage.getItem('item'));
    var quantity = JSON.parse(localStorage.getItem('quantity'));
    var method = localStorage.getItem("method");
    var expiration = $("#expire_m").val() + "/" + $("#expire_y").val();
    var base_url = window.location.origin;    
    $.ajax({
        type:"POST",
        url: base_url + '/products/api/addpayment/',
        data: {            
            "order": order,             
            "item": item,
            "quantity": quantity,
            "name": $('#name').val(),
            "card_number": $("#cardNumber").val(),
            "cvv": $("#cvv").val(),            
            "expiration": expiration,            
            "payment_method": method,
            "csrfmiddlewaretoken": $('input[name="csrfmiddlewaretoken"]').val(),
            },            
        success: function(data){            
            alert('Successfully Added!')
        },
        error: function(e){
           console.log(e);
        }
    });
});

$(document).on('submit', '#CODform', function(event){
    var base_url = window.location.origin;    
    var order = localStorage.getItem('order');
    var item = JSON.parse(localStorage.getItem('item'));
    var quantity = JSON.parse(localStorage.getItem('quantity'));
    var method = localStorage.getItem("method");
    $.ajax({
        type:"POST",
        url: base_url + '/products/api/addpayment/',
        data: {            
            "order": order,  
            "item": item,
            "quantity": quantity,
            "address": $("#address").val(),
            "payment_method": method,
            "csrfmiddlewaretoken": $('input[name="csrfmiddlewaretoken"]').val(),
            },            
        success: function(data){            
            alert('Successfully Added!')
        },
        error: function(e){
           console.log(e);
        }
    });
});