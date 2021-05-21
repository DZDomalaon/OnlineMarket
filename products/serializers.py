from django.db.models import fields
from rest_framework import serializers
from .models import Category, Product, SubCategory


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('product_name', 'product_image', 'description', 'location', 'price','shipping_fee','discount','is_discounted','is_available')
        
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
        fields = ('product_name', 'description', 'location', 'price', 'product_category', 'product_subcategory','shipping_fee','discount','is_discounted', 'quantity','is_available')

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
        fields = ('product_name', 'description', 'location', 'price', 'product_category', 'product_subcategory','shipping_fee','discount','is_discounted', 'quantity','is_available')
        
class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('category')

class SubCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = SubCategory
        fields = ('subcategory_img', 'subcategory')
