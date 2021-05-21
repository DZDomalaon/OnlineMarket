from django.urls import path
from . import views
from users.api import UserViewSet

app_name = 'users'
urlpatterns = [    
    
    path('login/', views.LoginView.as_view(), name="userlogin"),
    path('register/', views.RegisterView.as_view(), name="register"),
    path('dashboard/', views.DashboardView.as_view(), name="dashboard"),

    path('api/users/register/', UserViewSet.as_view({'post': 'post'})),
    path('api/login/', UserViewSet.as_view({'post': 'userlogin'})),
    path('api/logout/', UserViewSet.as_view({'get': 'userlogout'})),
]