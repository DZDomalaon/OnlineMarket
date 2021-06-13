$(document).ready(function(){    
    // document.getElementById("updatebtn").display = true;
    load_products();    
});

function quantity_change(){
    var x = document.getElementById("updatebtn");      
    x.style.display = "block";
}

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


function load_products() {
    var product = localStorage.getItem('product_id');
    var base_url = window.location.origin;

    $.ajax({
        type:"GET",
        url: base_url + '/products/api/productstatus/',     
        data: {'product': product},
        success: function(data){            
            var order = "";
            var stock = "";
            // console.log(data['product']['seller_id'])
            // var date = $.datepicker.formatDate("M d, yy", new Date(data.date_added));
            if($('#auth_user').val() == data['product']['seller_id']){
                stock += "<tr>"+
                        "<td>"+data['product']['product_name']+"</td>"+
                        "<td>"+data['product']['quantity']+"</td>"+
                        "<td><input type='number' class='form-control text-center' id='quantity' min='1' style='width: 70px'></input></td>"+                                                                                  
                        "<td><button class='btn-sm btn-warning text-white' id='addstock' onclick='addStock()'>Stock in</button></td>"+
                    "</tr>";
                // console.log(data['product'].length);                                                      
                for(var i=0; i<data['item'].length; i++){  
                    console.log(data['item'][i]);               

                    order += "<tr>"+
                                "<td>"+data['item'][i]['product']['product_name']+"</td>"+
                                "<td>"+data['item'][i]['quantity']+"</td>"+                                                      
                                "<td>"+data['item'][i]['date_added']+"</td>"+
                                (data['item'][i]['is_shipping'] == false ? `<td>Preparing the parcel</td>`:`<td>Out for Delivery</td>`)+
                                (data['item'][i]['shipping_duration'] != null ? "<td>"+data['item'][i]['shipping_duration']+"</td>":"<td></td>")+
                                (data['item'][i]['is_shipping'] == false ?"<td><button class='btn btn-warning text-white' onclick='ship_item("+ data['item'][i]['id'] +", "+data['item'][i]['quantity']+")'>Ship</button></td>" : '')+
                            "</tr>";
                };
                                        
                document.getElementById("product-stock").innerHTML = stock; 
                document.getElementById("product-status").innerHTML = order;         
            }else{
                document.getElementById("status").innerHTML = "You are not allowed to access this page.";   
            }
        },
        error: function(e){
            console.log(e);
        }
    });
}

function addStock(){    
    
    var product = localStorage.getItem('product_id');
    var base_url = window.location.origin;

    $.ajax({
        type:"POST",
        url: base_url + '/products/api/addstock/',     
        data:{'product': product,
              'quantity': $('#quantity').val(),
              'csrfmiddlewaretoken': csrftoken,
            },
        success: function(data){     
            load_products();                                
        },
        error: function(e){
            console.log(e);
        }
    }); 
}

function ship_item(data, quantity){
    var base_url = window.location.origin;
    var product = localStorage.getItem("product_id")
    $.ajax({
        type:"GET",
        url: base_url + '/products/api/shipitem/',     
        data:{'item': data,         
              'product': product,
              'quantity': quantity,
            },
        success: function(data){     
            load_products();                                
        },
        error: function(e){
            console.log(e);
        }
    }); 
}