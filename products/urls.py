from django.urls import path
from . import views
from .api import ProductViewSet

app_name = 'products'
urlpatterns = [    
    
    path('<int:pk>/viewproduct', views.ViewProduct.as_view(), name='viewproduct'),
    path('<int:pk>/ownedproducts', views.OwnedProductsView.as_view(), name='ownedproducts'),    
    path('<int:pk>/createproduct', views.CreateProductView.as_view(), name='createproduct'),
    path('<int:pk>/updateproduct', views.UpdateProductView.as_view(), name='updateproduct'),
    path('<int:pk>/productstatus', views.ProductStatusView.as_view(), name='productstatus'),

    path('api/addproduct/', ProductViewSet.as_view({'post': 'post'})),
    path('api/getproducts/', ProductViewSet.as_view({'get': 'get'})),
    path('api/getproduct/', ProductViewSet.as_view({'get': 'get_product'})),
    path('api/ownedproducts/', ProductViewSet.as_view({'get': 'get_owned_products'})),
    path('api/adminownedproducts/', ProductViewSet.as_view({'get': 'admin_get_owned_products'})),
    path('api/orderedproducts/', ProductViewSet.as_view({'get': 'get_ordered_products'})),
    path('api/adminorderedproducts/', ProductViewSet.as_view({'get': 'admin_get_ordered_products'})),
    path('api/productstatus/', ProductViewSet.as_view({'get': 'product_status'})),
    path('api/updateproduct/', ProductViewSet.as_view({'post': 'put'})),
    path('api/addpayment/', ProductViewSet.as_view({'post': 'add_payment'})),    
    path('api/addtocart/', ProductViewSet.as_view({'post': 'add_to_cart'})),
    path('api/updateitem/', ProductViewSet.as_view({'post': 'update_item'})),
    path('api/deleteproduct/', ProductViewSet.as_view({'delete': 'delete'})),
    path('api/removeitem/', ProductViewSet.as_view({'delete': 'remove_item'})),
]