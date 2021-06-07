from re import T

from django.db import models
from users.models import CustomUser
from django.db.models import fields
from rest_framework import serializers
from users.serializers import UserSerializer
from .models import CODPayment, CardPayment, Category, Order, OrderItem, OrderPayment, Product, SubCategory

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('category')

class SubCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = SubCategory
        fields = ('id', 'subcategory_img', 'subcategory')

class ProductSerializer(serializers.ModelSerializer):   
    
    # product_category = CategorySerializer()
    # product_subcategory = SubCategorySerializer()

    class Meta:
        model = Product
        fields = ('id','product_name', 'product_image',  'product_category', 'product_subcategory', 'description', 'location', 'price','shipping_fee','discount','is_discounted', 'quantity','is_available', 'seller_id',)

class ProductsSerializer(serializers.ModelSerializer):   
    class Meta:
        model = Product
        fields = "__all__"
        
class AddProductSerializer(serializers.ModelSerializer):
    
    product_name = serializers.CharField()
    product_image = serializers.ImageField()
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
        fields = ('product_name', 'product_name', 'product_image','description', 'location', 'price', 'product_category', 'product_subcategory','shipping_fee','discount','is_discounted', 'quantity','is_available')


class AddStock(serializers.Serializer):
    class Meta:
        model = Product
        fields = ('quantity',)

        
class UpdateProductSerializer(serializers.ModelSerializer):
    
    product_name = serializers.CharField()
    product_image = serializers.ImageField()
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
        fields = ('product_name', 'product_image', 'description', 'location', 'price','shipping_fee','discount','is_discounted', 'quantity','is_available')              

class OrderItemSerializer(serializers.ModelSerializer):
    
    date_added = serializers.DateTimeField(format="%Y-%m-%d")
    class Meta:
        model = OrderItem
        fields = ('id','quantity', 'date_added')  

class OrderItemAddSerializer(serializers.ModelSerializer):
        
    class Meta:
        model = OrderItem
        fields = ('id','quantity')  


class OrderAddSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Order
        fields = ('id', 'is_completed',)    

class UpdateOrderItemSerializer(serializers.ModelSerializer):
        
    class Meta:
        model = OrderItem
        fields = ('id','quantity')  

class OrderCartSerializer(serializers.ModelSerializer):

    date_ordered = serializers.DateTimeField(format="%Y-%m-%d")
    class Meta:
        model = Order
        fields = ('id','date_ordered', 'is_completed',)


class OrderPaymentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Order
        fields = ('id', 'is_completed',)

class OrderItemCartSerializer(serializers.ModelSerializer):
    
    date_added = serializers.DateTimeField(format="%Y-%m-%d")
    product = ProductSerializer()
    
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):

    order_item = OrderItemCartSerializer(many=True)
    date_ordered = serializers.DateTimeField(format="%Y-%m-%d")
    class Meta:
        model = Order
        fields = ('id','date_ordered', 'is_completed', 'order_item', 'buyer')

class PaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderPayment
        fields = ('id','amount', 'payment_method',)


class CODPaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = CODPayment
        fields = ('address',)


class CardPaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = CardPayment
        fields = ('name', 'card_number','cvv','expiration')