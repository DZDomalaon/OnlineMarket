$(document).ready(function(){    
    load_users();    
});


function set_user_id(data) {    
    console.log($(this).data("value"));
    localStorage.setItem("user_id", JSON.stringify( data ));    
}

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
                
                user_url = base_url + '/users/' + value.id;
                console.log(value);
                demo += "<tr>"+
                            "<td scope='row'>"+value.first_name+"</td>"+
                            "<td>"+value.last_name+"</td>"+                            
                            "<td>"+(value.is_seller ? 'Seller' : 'Buyer')+"</td>"+
                            "<td><a href='"+ user_url + "/userpage/' class='btn btn-dark' onclick='set_user_id("+ value.id +")'>View User</a></td>"+
                            // 
                        "</tr>";
            });
            
            document.getElementById("userlist").innerHTML = demo;                       
        },
        error: function(e){
            console.log(e);
        }
    });
}