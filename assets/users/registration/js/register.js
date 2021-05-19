$(document).ready(function(){
    $("#registerbtn").click(function(event){
      event.preventDefault();
    });
  });


$('#email').on('keypress', function() {
    var re = /([A-Z0-9a-z_-][^@])+?@[^$#<>?]+?\.[\w]{2,4}/.test(this.value);
    if(!re) {
        $('#error').show();
    } else {
        $('#error').hide();
    }
})

$('#password, #password2').on('keyup', function () {
    if ($('#password').val() == $('#password2').val()) {
      $('#message').html('Matching').css('color', 'green');
    } else 
      $('#message').html('Not Matching').css('color', 'red');
});



function addUser()
{
    var base_url = window.location.origin;
    var checkBox = document.getElementById("is_seller");
    var seller = false;
    if (checkBox.checked == true){
        seller = true;
    }
    else{
        seller = false
    }
    
    $.ajax({
        type:"POST",
        url: base_url + '/users/api/users/register/',
        data: {
            "email" : $("#email").val(),
            "first_name" : $("#first_name").val(),
            "last_name" : $("#last_name").val(),
            "password" : $("#password").val(),
            "password2" : $("#password2").val(),
            "is_seller" : seller,
            "csrfmiddlewaretoken": "{{ csrf_token }}",
            },            
        success: function(data){
            console.log(data)
        },
        error: function(e){
            console.log(e);
        }
    });
}

function add_success()
{
    alert("Added user Successfully");
}

function add_error()
{    
    alert("Can't add user!");
}
