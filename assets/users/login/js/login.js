$(document).ready(function(){
    $("#loginbtn").click(function(event){
      event.preventDefault();
    });
  });


function loginUser()
{
    var base_url = window.location.origin;
    $.ajax({
        type: "POST",
        url: base_url + '/users/api/login/',
        data: {
            "username" : $("#email").val(),
            "password" : $("#password").val(), 
            "csrfmiddlewaretoken": $('input[name="csrfmiddlewaretoken"]').val(),
            },            
        success: function(data){
            location.href= base_url + "/users/dashboard"
            localStorage.setItem("token", data.token);
            alert('Successfully logged in!');
        },
        error: function(e){
            console.log(e);
        }
    });
}