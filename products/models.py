from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields import CharField, SlugField
from datetime import timedelta, datetime
from users.models import CustomUser


class Category(models.Model):

    name = CharField(max_length=50)
    slug = SlugField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class SubCategory(models.Model):

    subcategory_img = models.ImageField(blank=True, null=True, upload_to='category/', default='default.png')
    name = CharField(max_length=50)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
        

class Product(models.Model):

    id = models.AutoField(primary_key=True, unique=True)
    product_name = models.CharField(max_length=250)
    product_image = models.ImageField(upload_to='product/', default='product/default.png')
    description = models.CharField(max_length=250)
    location = models.CharField(max_length=250, blank=True, null=True)  
    product_category = models.ForeignKey(Category, on_delete=models.CASCADE)
    product_subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    price = models.DecimalField(default=0, max_digits=8, decimal_places=2)  
    shipping_fee = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    discount = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    is_discounted = models.BooleanField(default=False)    
    quantity = models.IntegerField(default=0)
    is_available = models.BooleanField(default=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)    
    seller = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id)


class OrderItem(models.Model):

    product = models.ForeignKey(Product, on_delete=models.CASCADE)    
    quantity = models.IntegerField()
    date_added = models.DateTimeField(auto_now_add=True)
    is_shipping = models.BooleanField(default=False)
    shipping_duration = models.DurationField(blank=True, null=True)

    def __str__(self):
        return str(self.product)


class Order(models.Model):
    
    buyer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)  
    date_ordered = models.DateTimeField(auto_now_add=True)    
    is_completed = models.BooleanField(default=False)
    order_item = models.ManyToManyField(OrderItem)

    def __str__(self):
        return str(self.date_ordered)


class OrderPayment(models.Model):

    amount = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=20, default="COD")
    

class CODPayment(models.Model):

    address = models.CharField(max_length=100)    
    order_payment = models.ForeignKey(OrderPayment, on_delete=models.CASCADE)

class CardPayment(models.Model):
    
    name = models.CharField(max_length=50)
    card_number = models.IntegerField()
    cvv = models.IntegerField()
    expiration = models.CharField(max_length=10)    
    order_payment = models.ForeignKey(OrderPayment, on_delete=models.CASCADE)

