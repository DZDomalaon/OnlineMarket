$(document).ready(function(){
    $("#registerbtn").click(function(event){      
    });
    (function() {
        'use strict';
        window.addEventListener('load', function() {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);
    })();

    document.getElementById("success").style.display = "none";
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
    if ($('#password').val() == "" && $('#password2').val() == ""){
        $('#message').html('Enter password').css('color', 'red');
    }
    else{
        if ($('#password').val() == $('#password2').val()) {
            $('#message').html('Password Matching').css('color', 'green');
          } else 
            $('#message').html('Password not Matching').css('color', 'red');
    }    
});

$(document).on('submit', '#registerform', function(event){

    var base_url = window.location.origin;
    var checkBox = document.getElementById("is_seller");
    var seller = false;
    if (checkBox.checked == true){
        seller = true;
    }
    else{
        seller = false
    }
    event.preventDefault();
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
            "csrfmiddlewaretoken": $('input[name="csrfmiddlewaretoken"]').val(),
            },            
        success: function(data){          
            
            if(data.errors){
                $('#error').show();
                $('#error').text(data.errors.email);
            }
            else{
                document.getElementById("success").style.display = "block";
                var success="Successfully added!"+
                            "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                                "<span aria-hidden='true'>&times;</span>"+
                            "</button>";
                document.getElementById("success").innerHTML = success; 
            }
        },
        error: function(e){
            console(e);
        }
    });
});
