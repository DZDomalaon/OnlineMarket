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
            localStorage.setItem("token", data.token);
        },
        error: function(e){
            console.log(e);
        }
    });
}