$(document).ready(function(){    
    load_user_data();
    if(location.pathname.split('/')[2] != $('#auth_user').val()){
        document.getElementById("update").innerHTML = "You are not allowed to access this page.";
    }
});

function load_user_data() {

    var base_url = window.location.origin;
    var id = location.pathname.split('/')[2];    
    console.log(id);
    $.ajax({
        type:"GET",
        url: base_url + '/users/api/getuser/',
        data: {'user': id},
        success: function(data){   
            document.getElementById('fname').value = data['first_name'];
            document.getElementById('lname').value = data['last_name'];
        },
        error: function(e){
            console.log(e);
        }
    });
}

$(document).on('submit', '#update_user', function(event){
    var base_url = window.location.origin;   
    var id = $('#auth_user').val(); 
    event.preventDefault();    
    $.ajax({
        method:"post",
        url: base_url + '/users/api/updateuser/',
        data: {
            "user": id,
            "first_name": $("#fname").val(),      
            "last_name": $("#lname").val(),
            "csrfmiddlewaretoken": $('input[name="csrfmiddlewaretoken"]').val(),
            },                    
        success: function(data){
            console.log(data)
            alert('Successfully updated!')
        },
        error: function(e){
            console.log(e);
        }
    });
});