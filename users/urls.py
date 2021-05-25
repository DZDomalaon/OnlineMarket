from django.urls import path
from . import views
from users.api import UserViewSet

app_name = 'users'
urlpatterns = [    
    
    path('login/', views.LoginView.as_view(), name="userlogin"),
    path('register/', views.RegisterView.as_view(), name="register"),
    path('dashboard/', views.DashboardView.as_view(), name="dashboard"),
    path('<int:pk>/updateuser/', views.UpdateUserView.as_view(), name="updateuser"),
    path('userlist/', views.UserListView.as_view(), name="userlist"),
    path('<int:pk>/usercart/', views.UserCartView.as_view(), name="usercart"),

    path('api/getuser/', UserViewSet.as_view({'get': 'get'})),
    path('api/getusers/', UserViewSet.as_view({'get': 'userlist'})),    
    path('api/updateuser/', UserViewSet.as_view({'post': 'update_user'})),
    path('api/users/register/', UserViewSet.as_view({'post': 'post'})),
    path('api/login/', UserViewSet.as_view({'post': 'userlogin'})),
    path('api/logout/', UserViewSet.as_view({'get': 'userlogout'})),

    
]