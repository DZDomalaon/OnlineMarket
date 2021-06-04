$(document).ready(function(){    
    load_products();    
});

function load_products() {

    var base_url = window.location.origin;
    var get_items = [];
    var quantity = [];
    $.ajax({
        type:"GET",
        url: base_url + '/products/api/orderstatus/',     
        contentType: false,
        processData: false,     
        success: function(data){            
            console.log(data['order'][0]['order_item'][0]);
            var order = "";                                          
            for(var i=0; i < data['order'].length; i++){
                for(var j=0; j< data['order'][i]['order_item'].length; j++){
                order += "<tr>"+
                            "<td>"+data['order'][i]['order_item'][j]['product']['product_name']+"</td>"+
                            "<td>"+data['order'][i]['order_item'][j]['quantity']+"</td>"+                                                      
                            "<td>"+data['order'][i]['order_item'][j]['date_added']+"</td>"+
                            (data['order'][i]['order_item'][j]['is_shipping'] == false ? "<td>Seller is preparing to ship your parcel</td>" : "<td>Parcel is out for delivery</td>")+                              
                        "</tr>";                 
                }                
            }
            document.getElementById("order-status").innerHTML = order;                       
        },
        error: function(e){            
            console.log(e);
        }
    });
}