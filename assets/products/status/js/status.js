$(document).ready(function(){    
    // document.getElementById("updatebtn").display = true;
    load_products();    
});

function quantity_change(){
    var x = document.getElementById("updatebtn");      
    x.style.display = "block";
}

function load_products() {
    var product = localStorage.getItem('product_id');
    var base_url = window.location.origin;

    $.ajax({
        type:"GET",
        url: base_url + '/products/api/productstatus/',     
        data: {'product': product},
        success: function(data){            
            var demo = "";
            // var date = $.datepicker.formatDate("M d, yy", new Date(data.date_added));
            console.log(data);                                                      
            $.each(data, function( index, value ){  
                console.log(value['']);
                demo += "<tr>"+
                            "<td>"+value['product'].product_name+"</td>"+
                            "<td>"+value.quantity+"</td>"+                                                      
                            "<td>"+value.date_added+"</td>"+
                            "<td>"+value.is_shipping+"</td>"+
                            "<td></td>"+
                            "<td><button class='btn btn-warning' id='updatebtn"+product.id+"' style='display: none'>Update</button></td>"+
                        "</tr>";
            });
                                       
            
            document.getElementById("product-status").innerHTML = demo;                       
        },
        error: function(e){
            console.log(e);
        }
    });
}