from django.urls import path
from . import views
from .api import *

app_name = 'products'
urlpatterns = [    
    
    path('<int:pk>/viewproduct', views.ViewProduct.as_view(), name='viewproduct'),
    path('<int:pk>/ownedproducts', views.OwnedProductsView.as_view(), name='ownedproducts'),    
    path('<int:pk>/createproduct', views.CreateProductView.as_view(), name='createproduct'),
    path('<int:pk>/updateproduct', views.UpdateProductView.as_view(), name='updateproduct'),
    path('<int:pk>/productstatus', views.ProductStatusView.as_view(), name='productstatus'),
    path('<int:pk>/undercategory', views.UnderCategory.as_view(), name='undercategory'),

    # AllowAny
    path('api/getproduct/', ProductViewSet.as_view({'get': 'get_product'})),
    path('api/getproducts/', ProductViewSet.as_view({'get': 'get'})),
    path('api/saleproducts/', ProductViewSet.as_view({'get': 'get_on_sale'})),
    path('api/categories/', ProductViewSet.as_view({'get': 'get_categories'})),
    path('api/undercategories/', ProductViewSet.as_view({'get': 'under_category'})),
    path('api/search/', ProductViewSet.as_view({'post': 'search'})),                 

    # ProductForAuthUser
    path('api/addproduct/', ProductForAuthUserViewSet.as_view({'post': 'post'})),
    path('api/updateproduct/', ProductForAuthUserViewSet.as_view({'post': 'put'})),
    path('api/deleteproduct/', ProductForAuthUserViewSet.as_view({'delete': 'delete'})),

    # AuthSeller
    path('api/ownedproducts/', AuthSellerViewSet.as_view({'get': 'get_owned_products'})),
    path('api/productstatus/', AuthSellerViewSet.as_view({'get': 'product_status'})),
    path('api/shipitem/', AuthSellerViewSet.as_view({'get': 'ship_item'})),
    path('api/addorder/', AuthSellerViewSet.as_view({'post': 'create_order'})),     
    path('api/addstock/', AuthSellerViewSet.as_view({'post': 'add_stock'})), 

    # AuthBuyer    
    path('api/orderedproducts/', AuthBuyerViewSet.as_view({'get': 'get_ordered_products'})),     
    path('api/orderstatus/', AuthBuyerViewSet.as_view({'get': 'order_status'})),    

    # AdminUser
    path('api/adminorderedproducts/', AdminUserViewSet.as_view({'get': 'admin_get_ordered_products'})),   
    path('api/adminownedproducts/', AdminUserViewSet.as_view({'get': 'admin_get_owned_products'})),
    path('api/userorders/', AdminUserViewSet.as_view({'get': 'admin_get_user_orders'})),

    # Cart
    path('api/countitem/', CartViewSet.as_view({'get': 'item_count'})),
    path('api/addtocart/', CartViewSet.as_view({'post': 'add_to_cart'})),
    path('api/updateitem/', CartViewSet.as_view({'post': 'update_item'})),    
    path('api/removeitem/', CartViewSet.as_view({'delete': 'remove_item'})),


    # Payment
    path('api/addpayment/', PaymentViewSet.as_view({'post': 'add_payment'})),     
]