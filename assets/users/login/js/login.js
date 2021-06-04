$(document).ready(function(){
    $("#loginbtn").click(function(event){
      event.preventDefault();
    });

    document.getElementById("error").style.display = "none";
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
            console.log(data);            
            if(data.error){
                document.getElementById("error").style.display = "block";
                var error = "Incorrect email or password."+
                            "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                                "<span aria-hidden='true'>&times;</span>"+
                            "</button>";
                document.getElementById("error").innerHTML = error; 
            }
            else{
                localStorage.setItem("token", data.token);
                location.href= base_url + "/users/dashboard";    
            }                  
        },
        error: function(e){
            console.log(e);
        }
    });
}