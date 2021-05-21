function logoutUser()
{
    var base_url = window.location.origin;
    $.ajax({
        type: "GET",
        url: base_url + '/users/api/logout/',          
        success: function(data){
            location.href= base_url + "/users/dashboard"
            alert('Successfully logged out!');
        },
        error: function(e){
            console.log(e);
        }
    });
}