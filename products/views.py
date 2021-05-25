from django.shortcuts import get_object_or_404, render
from django.views.generic.base import TemplateView
from .models import Category, CustomUser, Product, SubCategory


class OwnedProductsView(TemplateView):
    
    def get(self, request, *args, **kwargs):
        current_user = CustomUser.objects.get(pk=kwargs.get('pk'))
        owned_products = Product.objects.filter(seller=request.user)
        return render(request, "products/owned_products.html", {'current_user': current_user, 'owned_products': owned_products})

class CreateProductView(TemplateView):    
    
    def get(self, request, *args, **kwargs):
        categories = Category.objects.all()
        sub_categories = SubCategory.objects.all()

        context = {
            'categories': categories,
            'sub_categories': sub_categories,
        }
        return render(request, 'products/create_product.html', context)

class UpdateProductView(TemplateView):    
    
    def get(self, request, *args, **kwargs):
        categories = Category.objects.all()
        sub_categories = SubCategory.objects.all()
        instance = get_object_or_404(Product, pk=kwargs.get('pk'))
        
        context = {
            'categories': categories,
            'sub_categories': sub_categories,
            'instance': instance,
        }
        return render(request, 'products/update_product.html', context)

class ViewProduct(TemplateView):
    template_name = 'products/product_page.html'    