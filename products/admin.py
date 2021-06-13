from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(OrderPayment)
admin.site.register(CODPayment)
admin.site.register(CardPayment)

