$(document).ready(function(){    
    item_count();
});


function item_count(){
    var base_url = window.location.origin;
    $.ajax({
        type: "GET",
        url: base_url + '/products/api/countitem/',          
        success: function(data){
            console.log(data);
            document.getElementById("count").textContent=data['count'];
            // setTimeout(item_count, 2000);
        },
        error: function(e){
            console.log(e);
        }
    });
}