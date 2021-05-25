from re import T

from django.db import models
from users.models import CustomUser
from django.db.models import fields
from rest_framework import serializers
from users.serializers import UserSerializer
from .models import Category, Order, OrderItem, Product, SubCategory

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('category')

class SubCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = SubCategory
        fields = ('subcategory_img', 'subcategory')

class ProductSerializer(serializers.ModelSerializer):

    # category = CategorySerializer(source='product_category.category', many=True)
    # product_subcategory = SubCategorySerializer(source='product_subcategory.subcategory', many=True)

    class Meta:
        model = Product
        fields = ('id','product_name', 'product_image', 'description', 'location', 'price','shipping_fee','discount','is_discounted', 'quantity','is_available', 'seller_id')
        
class AddProductSerializer(serializers.ModelSerializer):
    
    product_name = serializers.CharField()
    # product_image = serializers.ImageField()
    description = serializers.CharField()
    location = serializers.CharField()
    price = serializers.DecimalField(max_digits=8, decimal_places=2)
    shipping_fee = serializers.DecimalField(max_digits=10, decimal_places=2)
    discount = serializers.DecimalField(max_digits=10, decimal_places=2)
    is_discounted = serializers.BooleanField(default=False)
    quantity = serializers.IntegerField()
    is_available = serializers.BooleanField(default=True)

    class Meta:
        model = Product
        fields = ('product_name', 'product_image', 'description', 'location', 'price', 'product_category', 'product_subcategory','shipping_fee','discount','is_discounted', 'quantity','is_available')

class UpdateProductSerializer(serializers.ModelSerializer):
    
    product_name = serializers.CharField()
    # product_image = serializers.ImageField()
    description = serializers.CharField()
    location = serializers.CharField()
    price = serializers.DecimalField(max_digits=8, decimal_places=2)
    shipping_fee = serializers.DecimalField(max_digits=10, decimal_places=2)
    discount = serializers.DecimalField(max_digits=10, decimal_places=2)
    is_discounted = serializers.BooleanField(default=False)
    quantity = serializers.IntegerField()
    is_available = serializers.BooleanField(default=True)

    class Meta:
        model = Product
        fields = ('product_name', 'description', 'location', 'price','shipping_fee','discount','is_discounted', 'quantity','is_available')
        

class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ('id','date_ordered', 'is_completed')        

class OrderItemSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = OrderItem
        fields = ('id','quantity', 'date_added')
