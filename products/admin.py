from django.contrib import admin
from .models import OrderPayment, Product, Category, SubCategory, Order, OrderItem
# Register your models here.
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(OrderPayment)
