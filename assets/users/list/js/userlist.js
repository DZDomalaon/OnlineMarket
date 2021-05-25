$(document).ready(function(){    
    load_users();
});


function load_users() {

    var base_url = window.location.origin;

    $.ajax({
        type:"GET",
        url: base_url + '/users/api/getusers/',     
        contentType: false,
        processData: false,     
        success: function(data){            
            var demo = "";
            console.log(data);             
            $.each(data, function( index, value ){
                
                console.log(value.email);
                demo += "<tr>"+
                            "<td scope='row'>"+value.first_name+"</td>"
                            "<td>"+value.last_name+"</td>"+                            
                            "<td>"+value.is_seller+"</td>"+
                            "<td><a href='#' class='btn btn-dark'>View</a></td>"
                        "</tr>";
                                
            });
            
            document.getElementById("userlist").innerHTML = demo;                       
        },
        error: function(e){
            console.log(e);
        }
    });
}