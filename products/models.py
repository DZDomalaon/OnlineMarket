from django.db import models
from django.db.models.fields import CharField, SlugField
from users.models import CustomUser

class Category(models.Model):

    category = CharField(max_length=50)
    slug = SlugField(max_length=50, unique=True)

    def __str__(self):
        return self.category

class SubCategory(models.Model):

    subcategory_img = models.ImageField(blank=True, null=True, upload_to='category/', default='')
    subcategory = CharField(max_length=50)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.subcategory

class Product(models.Model):

    product_name = models.CharField(max_length=250)
    product_image = models.ImageField(blank=True, null=True, upload_to='product/', default='')
    description = models.CharField(max_length=250)
    location = models.CharField(max_length=250, blank=True, null=True)  
    product_category = models.ForeignKey(Category, on_delete=models.CASCADE)
    product_subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    price = models.DecimalField(default=0, max_digits=8, decimal_places=2)  
    shipping_fee = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    discount = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    is_discounted = models.BooleanField(default=False)    
    quantity = models.IntegerField(default=0)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)    
    seller = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.product_name


class ProductCart(models.Model):

    checkedout_date = models.DateTimeField(auto_now_add=True)
    buyer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)  
    product = models.ForeignKey(Product, on_delete=models.CASCADE)   
    total = models.DecimalField(default=0, max_digits=10, decimal_places=2)       
    subtotal = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    status = models.BooleanField()

    def __str__(self):
        return str(self.checkedout_date)


class ProductComment(models.Model):
    
    comment = models.CharField(max_length=250)
    date_created = models.DateTimeField(auto_now_add=True)        
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)    

    def __str__(self):
        return self.comment

