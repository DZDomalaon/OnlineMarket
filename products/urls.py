from django.urls import path
from . import views
from .api import ProductViewSet

app_name = 'products'
urlpatterns = [    
    
    path('<int:pk>/ownedproducts', views.OwnedProductsView.as_view(), name='ownedproducts'),
    path('<int:pk>/createproduct', views.CreateProductView.as_view(), name='createproduct'),
    path('<int:pk>/updateproduct', views.UpdateProductView.as_view(), name='updateproduct'),
    # path('register/', views.RegisterView.as_view(), name="register"),
    # path('dashboard/', views.DashboardView.as_view(), name="dashboard"),

    path('api/addproduct/', ProductViewSet.as_view({'post': 'post'})),    
    path('api/getproducts/', ProductViewSet.as_view({'get': 'get'})),
    path('api/updateproduct/', ProductViewSet.as_view({'post': 'put'})),
]